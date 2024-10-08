const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

module.exports = (pool) => {
    const router = express.Router();

    router.get("/", verifyToken, async (req, res) => {
        try {
            const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
            const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu
            const event = await pool.query(`SELECT * FROM SuKien WHERE ID_ThuongHieu = '${id_thuonghieu}'`)
            if (!event) {
                return res
                .status(400)
                .json({ success: false, message: "Event not found" });
            }
            if (event.rowCount > 0) {
                const formatData = await Promise.all(event.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, events: formatData });
            }
        } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

    // @route POST api/event/create
    // desc Create event of Brand
    // @access Public

    router.post("/create", verifyToken, async (req, res) => {
        const { tensukien, hinhanh, id_game, soluongvoucher, mota, thoigianbatdau, thoigianketthuc } = req.body;
    
        if (!tensukien || !hinhanh || !id_game || !soluongvoucher || !thoigianbatdau || !thoigianketthuc) {
        return res
            .status(400)
            .json({ success: false, message: "Missing information" });
        }

        try {
            const existEvent = await pool.query(`SELECT * FROM SuKien WHERE tensukien = '${tensukien}'`)
            if (existEvent.rows.length > 0) {
                return res
                .status(400)
                .json({ success: false, message: "Event is exist" });
            }

            const getLastID = await pool.query(`
                SELECT ID_SuKien FROM SuKien 
                ORDER BY ID_SuKien DESC 
                LIMIT 1;
            `);
            
            let newID;
            if (getLastID.rowCount > 0) {
                const lastID = getLastID.rows[0].id_sukien;
                const numericPart = parseInt(lastID.slice(2), 10);
                const incrementedID = numericPart + 1;
            
                newID = 'EV' + incrementedID.toString().padStart(8, '0');
            } else {
                newID = 'EV00000001';
            }

            const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
            const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu

            const newEvent = await pool.query(`INSERT INTO SuKien(ID_SuKien, ID_ThuongHieu, ID_Game, TenSuKien, HinhAnh, SoLuongVoucher, MoTa, ThoiGianBatDau, ThoiGianKetThuc) VALUES ('${newID}', '${id_thuonghieu}', '${id_game}', '${tensukien}', '${hinhanh}', ${soluongvoucher}, '${mota}', '${thoigianbatdau}', '${thoigianketthuc}') RETURNING *;`)
        
            res.json({
                success: true,
                message: "Create new event successfully",
                event: newEvent.rows[0],
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });

    router.delete("/:id", verifyToken, async (req, res) => {
        try {
            const id_sukien = req.params.id;
            const existEvent = await pool.query(`SELECT * FROM SuKien WHERE ID_SuKien = '${id_sukien}' AND ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
            const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
            const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu
        
            if (existEvent.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Event is not exist" });
            }
            else {
                const isDeleted = await pool.query(`DELETE FROM SuKien WHERE ID_SuKien = '${id_sukien}' AND ID_ThuongHieu = '${id_thuonghieu}'`)
                if (isDeleted.rowCount > 0) {
                    return res.json({
                        success: true,
                        message: "Event succesfully deleted",
                      });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }
    });

    router.put("/:id", verifyToken, async (req, res) => {
        let { tensukien, hinhanh, soluongvoucher, mota, thoigianbatdau, thoigianketthuc, id_game } = req.body
        const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
        const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu

        let updateParam = "";

        let conditions = [];

        if (mota) conditions.push(`mota = '${mota}'`);
        if (id_game) conditions.push(`id_game = '${id_game}'`);
        if (tensukien) conditions.push(`tensukien = '${tensukien}'`);
        if (hinhanh) conditions.push(`hinhanh = '${hinhanh}'`);
        if (soluongvoucher && soluongvoucher > 0) conditions.push(`soluongvoucher = ${soluongvoucher}`);
        if (thoigianbatdau) conditions.push(`thoigianbatdau = '${thoigianbatdau}'`);
        if (thoigianketthuc) conditions.push(`thoigianketthuc = '${thoigianketthuc}'`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE SuKien SET ${updateParam} WHERE ID_SuKien = '${req.params.id}' AND ID_ThuongHieu = '${id_thuonghieu}' RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Event updated succesfully",
                    event: isUpdated.rows[0]
                    });
                
            }
            return res
                  .status(401)
                  .json({ success: false, message: "User not authorized" });
            
        } 
        catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }  
    });

    router.get("/fetchquestion/:id", async (req, res) => {
        const id_sukien = req.params.id

        if(!id_sukien) {
            return res
            .status(400)
            .json({ success: false, message: "Missing information of event" });
        }

        try {
            const Questions = await pool.query(`SELECT * FROM CauHoi_SuKien WHERE ID_SuKien = '${id_sukien}';`)

            if(Questions.rowCount === 0) {
                return res.json({
                    success: true,
                    message: "There is no question for this event"
                })
            }
            const formatData = Questions.rows.map(row => {
                return {
                    questionText: row.cauhoi,
                    answers: [row.a, row.b, row.c, row.d],
                    correctAnswer: row.dapan
                }
            })
        
            return res.json({
                success: true,
                _questions: formatData
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });

    router.post("/createquestion", verifyToken, async (req, res) => {
        const { id_sukien, stt, cauhoi, a, b, c, d, dapan } = req.body

        if(!id_sukien || !cauhoi || !a || !b || !c || !d || !dapan) {
            return res
            .status(400)
            .json({ success: false, message: "Missing information of question" });
        }

        let newSTT
        try {
            if (!stt) {
                const getLastSTT = await pool.query(`
                    SELECT * FROM CauHoi_SuKien 
                    ORDER BY STT DESC 
                    LIMIT 1;
                `);
                
                if (getLastSTT.rowCount > 0) {
                    newSTT = getLastSTT.rows[0].stt + 1;
                } else {
                    newSTT = 1;
                }
            }
            else newSTT = stt
            
            const newQuestion = await pool.query(`INSERT INTO CauHoi_SuKien(ID_SuKien, STT, CauHoi, A, B, C, D, DapAn)
                                                VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
                                            [id_sukien, newSTT, cauhoi, a, b, c, d, dapan])
            return res.json({
                success: true,
                message: "Create new question for event successfully",
                question: newQuestion.rows[0],
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });

    router.post("/deletequestion", verifyToken, async (req, res) => {
        const { id_sukien, stt } = req.body
        if (!id_sukien || !stt) return res
            .status(400)
            .json({ success: false, message: "Missing information of question" });

        try {
            const existQuestion = await pool.query(`SELECT * FROM CauHoi_SuKien WHERE ID_SuKien = '${id_sukien}' AND STT = ${stt}`)
        
            if (existQuestion.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Question is not exist" });
            }
            else {
                const isDeleted = await pool.query(`DELETE FROM CauHoi_SuKien WHERE ID_SuKien = '${id_sukien}' AND STT = ${stt}`)
                if (isDeleted.rowCount > 0) {
                    return res.json({
                        success: true,
                        message: "Question succesfully deleted",
                      });
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }
    });

    router.delete("/deleteallquestionoffevent/:id", verifyToken, async (req, res) => {
        const id_sukien = req.params.id

        try {
            const isDeleted = await pool.query(`DELETE FROM CauHoi_SuKien WHERE ID_SuKien = '${id_sukien}'`)
            if (isDeleted.rowCount >= 0) {
                return res.json({
                    success: true,
                    message: "Question succesfully deleted",
                    });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }
    });

    router.post("/updatequestion", verifyToken, async (req, res) => {
        let { id_sukien, stt, cauhoi, a, b, c, d, dapan } = req.body
        if(!id_sukien || !stt) return res
            .status(400)
            .json({ success: false, message: "Missing information of question" });

        let updateParam = "";

        let conditions = [];

        if (cauhoi) conditions.push(`cauhoi = '${cauhoi}'`);
        if (a) conditions.push(`a = '${a}'`);
        if (b) conditions.push(`b = '${b}'`);
        if (c) conditions.push(`c = '${c}'`);
        if (d) conditions.push(`d = '${d}'`);
        if (dapan) conditions.push(`dapan = '${dapan}'`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE CauHoi_SuKien SET ${updateParam} WHERE ID_SuKien = '${id_sukien}' AND STT = ${stt} RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Question updated succesfully",
                    event: isUpdated.rows[0]
                    });
                
            }
            return res
                  .status(401)
                  .json({ success: false, message: "User not authorized" });
            
        } 
        catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }  
    });

    // @route GET api/detailevent
    // @desc Get detail event
    // @access Public

    router.get("/detailevent/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const detailedEvent = await pool.query(`SELECT * FROM SuKien WHERE ID_SuKien = '${id}';`)
            if (detailedEvent.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Event is not exist" });
            }
            if (detailedEvent.rowCount > 0) {
                const formatData = await Promise.all(detailedEvent.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, events: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
        }
    });

    // @route GET api/eventofbrand
    // @desc GET eventofbrand
    // @access Public

    router.get("/eventofbrand/:id", async (req, res) => {
        const id = req.params.id
        try {
            const events = await pool.query(`SELECT * FROM SuKien WHERE ID_ThuongHieu = '${id}';`)
            if (events.rowCount > 0) {
                const formatData = await Promise.all(events.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, events: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
        }
    });

    // @route GET api/allevent
    // @desc GET allevent
    // @access Public

    router.get("/allevent", async (req, res) => {
        try {
            const events = await pool.query(`SELECT * FROM SuKien;`)
            if (events.rowCount > 0) {
                const formatData = await Promise.all(events.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, events: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
        }
    });

    return router;
}