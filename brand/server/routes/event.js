const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

module.exports = (pool) => {
    const router = express.Router();

    router.get("/", verifyToken, async (req, res) => {
        try {
            const event = await pool.query(`SELECT * FROM SuKien WHERE ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
            if (!event) {
                return res
                .status(400)
                .json({ success: false, message: "Event not found" });
            }
            res.json({ success: true, event: event.rows });
            } catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

    // @route POST api/event/create
    // desc Create event of Brand
    // @access Public

    router.post("/create", verifyToken, async (req, res) => {
        const { tensukien, soluongvoucher, thoigianbatdau, thoigianketthuc } = req.body;
    
        if (!tensukien || !soluongvoucher || !thoigianbatdau || !thoigianketthuc) {
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

            const id_thuonghieu = req.ID_ThuongHieu

            const newEvent = await pool.query(`INSERT INTO SuKien(ID_SuKien, ID_ThuongHieu, TenSuKien, SoLuongVoucher, ThoiGianBatDau, ThoiGianKetThuc) VALUES ('${newID}', '${id_thuonghieu}', '${tensukien}', ${soluongvoucher}, '${thoigianbatdau}', '${thoigianketthuc}') RETURNING *;`)
            var accessToken;

            if(newEvent.rowCount > 0) {
                accessToken = jwt.sign(
                    { ID_SuKien: newID },
                    process.env.ACCESS_TOKEN
                );
            }
        
            res.json({
                success: true,
                message: "Create new event successfully",
                accessToken,
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
        
            if (existEvent.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Event is not exist" });
            }
            else {
                const isDeleted = await pool.query(`DELETE FROM SuKien WHERE ID_SuKien = '${id_sukien}' AND ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
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
        let { tensukien, hinhanh, soluongvoucher, thoigianbatdau, thoigianketthuc } = req.body

        let updateParam = "";

        let conditions = [];

        if (tensukien) conditions.push(`tensukien = '${tensukien}'`);
        if (hinhanh) conditions.push(`hinhanh = '${hinhanh}'`);
        if (soluongvoucher && soluongvoucher > 0) conditions.push(`soluongvoucher = ${soluongvoucher}`);
        if (thoigianbatdau) conditions.push(`thoigianbatdau = '${thoigianbatdau}'`);
        if (thoigianketthuc) conditions.push(`thoigianketthuc = '${thoigianketthuc}'`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE SuKien SET ${updateParam} WHERE ID_SuKien = '${req.params.id}' AND ID_ThuongHieu = '${req.ID_ThuongHieu}' RETURNING *;`)

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

    router.get("/fetchquestion", verifyToken, async (req, res) => {
        const { id_sukien } = req.body

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
            var accessToken;

            if(newQuestion.rowCount > 0) {
                accessToken = jwt.sign(
                    { STT: stt },
                    process.env.ACCESS_TOKEN
                );
            }
        
            return res.json({
                success: true,
                message: "Create new question for event successfully",
                accessToken,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });

    router.get("/deletequestion", verifyToken, async (req, res) => {
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

    router.get("/updatequestion", verifyToken, async (req, res) => {
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

    return router;
}