const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

module.exports = (pool) => {
    const router = express.Router();

    router.get("/", verifyToken, async (req, res) => {
        const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
        const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu
        try {
            const voucher = await pool.query(`SELECT * FROM Voucher WHERE ID_ThuongHieu = '${id_thuonghieu}'`)
            if (!voucher) {
                return res
                .status(400)
                .json({ success: false, message: "There is no voucher" });
        }
        res.json({ success: true, voucher: voucher.rows });
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

    // @route POST api/voucher/create
    // desc Create voucher
    // @access Public

    router.post("/create", verifyToken, async (req, res) => {
        const { ten, qrcode, hinhanh, trigia, diem, mota, ngayhethan } = req.body;

        const brand = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
        const id_thuonghieu = brand.rows[0].id_thuonghieu
    
        if (!ten || !trigia || !ngayhethan) {
        return res
            .status(400)
            .json({ success: false, message: "Missing information" });
        }
        try {
            let tmp_qrcode
            if (qrcode) {
                const existVoucher = await pool.query(`SELECT * FROM Voucher WHERE ten = '${ten}'`)
                if (existVoucher.rows.length > 0) {
                    return res
                    .status(400)
                    .json({ success: false, message: "Voucher is exist" });
                }
                else tmp_qrcode = qrcode
            }
            else tmp_qrcode = process.env.URL_DEFAULT_QRCODE
            let tmp_hinhanh
            if(hinhanh) tmp_hinhanh = hinhanh
            else tmp_hinhanh = process.env.URL_DEFAULT_VOUCHER

            const getLastID = await pool.query(`
                SELECT ID_Voucher FROM Voucher 
                ORDER BY ID_Voucher DESC 
                LIMIT 1;
            `);
            
            let newID;
            if (getLastID.rowCount > 0) {
                const lastID = getLastID.rows[0].id_voucher;
                const numericPart = parseInt(lastID.slice(2), 10);
                const incrementedID = numericPart + 1;
            
                newID = 'VC' + incrementedID.toString().padStart(8, '0');
            } else {
                newID = 'VC00000001';
            }

            const newVoucher = await pool.query(`INSERT INTO Voucher(ID_Voucher, ID_ThuongHieu, ten, qrcode, hinhanh, trigia, diem, mota, ngayhethan, trangthai) VALUES ('${newID}', '${id_thuonghieu}', '${ten}', '${tmp_qrcode}', '${tmp_hinhanh}', ${trigia}, ${diem}, '${mota}', '${ngayhethan}', true) RETURNING *;`)
        
            res.json({
                success: true,
                message: "Create new voucher successfully",
                voucher: newVoucher.rows[0]
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
        const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
        const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu
        try {
            const id_voucher = req.params.id;
            const existVoucher = await pool.query(`SELECT * FROM Voucher WHERE ID_Voucher = '${id_voucher}' AND ID_ThuongHieu = '${id_thuonghieu}'`)
        
            if (existVoucher.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Voucher is not exist" });
            }
            else {
                const deleteVoucherSuKien = await pool.query(
                    `DELETE FROM Voucher_SuKien WHERE ID_Voucher = $1`, [id_voucher]
                );
            
                const deleteVoucher = await pool.query(
                    `DELETE FROM Voucher WHERE ID_Voucher = $1 AND ID_ThuongHieu = $2`, 
                    [id_voucher, id_thuonghieu]
                );
            
                if (deleteVoucher.rowCount > 0) {
                    return res.json({
                        success: true,
                        message: "Voucher successfully deleted",
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
        let { ten, qrcode, hinhanh, trigia, diem, mota, ngayhethan } = req.body
        const thuonghieu = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ChuThuongHieu = '${req.id}'`)
        const id_thuonghieu = thuonghieu.rows[0].id_thuonghieu

        let updateParam = "";

        let conditions = [];

        if (ten) conditions.push(`ten = '${ten}'`);
        if (qrcode) conditions.push(`qrcode = '${qrcode}'`);
        if (hinhanh) conditions.push(`hinhanh = '${hinhanh}'`);
        if (trigia && trigia > 0) conditions.push(`trigia = ${trigia}`);
        if (diem && diem > 0) conditions.push(`diem = ${diem}`);
        if (mota) conditions.push(`mota = '${mota}'`);
        if (ngayhethan) conditions.push(`ngayhethan = '${ngayhethan}'`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE Voucher SET ${updateParam} WHERE ID_Voucher = '${req.params.id}' AND ID_ThuongHieu = '${id_thuonghieu}' RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Voucher updated succesfully",
                    voucher: isUpdated.rows[0]
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


    // @route POST api/voucher/createvoucherevent
    // desc Create voucher
    // @access Public

    router.post("/createvoucherevent", verifyToken, async (req, res) => {
        const { id_voucher, id_sukien, soluong } = req.body;
    
        if (!id_voucher || !id_sukien || !soluong) {
        return res
            .status(400)
            .json({ success: false, message: "Missing information" });
        }
        try {
            const existVoucher = await pool.query(`SELECT * FROM Voucher_SuKien WHERE ID_Voucher = '${ id_voucher }' AND ID_SuKien = '${id_sukien}'`)
            if (existVoucher.rows.length > 0) {
                return res
                .status(400)
                .json({ success: false, message: "Voucher of event is exist" });
            }

            const newVoucher = await pool.query(`INSERT INTO Voucher_SuKien (ID_Voucher, ID_SuKien, SoLuong, SoLuongSuDung, NganSach) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
                                                [id_voucher, id_sukien, soluong, 0, 0])

            if(newVoucher.rowCount > 0) {
                res.json({
                    success: true,
                    message: "Create new voucher successfully",
                    voucher: newVoucher.rows[0],
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

    router.get("/voucherofevent/:id", async (req, res) => {
        const id_sukien = req.params.id;
        try {
            const voucher = await pool.query(`SELECT * FROM Voucher_SuKien WHERE ID_SuKien = '${id_sukien}';`)
            if (voucher.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "There is no voucher of event" });
            }
            if (voucher.rowCount > 0) {
                const formatData = await Promise.all(voucher.rows.map(async row => {
                const ten = await pool.query(`SELECT Ten FROM Voucher WHERE ID_Voucher = '${row.id_voucher}';`)
                return {
                        ...row,
                        tenvoucher: ten.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, voucher: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

    router.post("/deletevoucherevent", verifyToken, async (req, res) => {
        const { id_voucher, id_sukien } = req.body;
    
        if (!id_voucher || !id_sukien) {
            return res
                .status(400)
                .json({ success: false, message: "Missing information" });
        }
        try {
            const existVoucher = await pool.query(`SELECT * FROM Voucher_SuKien WHERE ID_Voucher = '${id_voucher}' AND ID_SuKien = '${id_sukien}'`)
        
            if (existVoucher.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Voucher is not exist" });
            }
            else {
                const deleteVoucherSuKien = await pool.query(
                    `DELETE FROM Voucher_SuKien WHERE ID_Voucher = $1 AND ID_SuKien = $2`, [id_voucher, id_sukien]
                );
            
                if (deleteVoucherSuKien.rowCount > 0) {
                    return res.json({
                        success: true,
                        message: "Voucher of event successfully deleted",
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

    router.post("/updatevoucherevent", verifyToken, async (req, res) => {
        const { id_voucher, id_sukien, soluong, ngansach } = req.body;
    
        if (!id_voucher || !id_sukien) {
            return res
                .status(400)
                .json({ success: false, message: "Missing information" });
        }
        let updateParam = "";

        let conditions = [];

        if (soluong) conditions.push(`soluong = ${soluong}`);
        if (ngansach) conditions.push(`ngansach = ${ngansach}`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE Voucher_SuKien SET ${updateParam} WHERE ID_Voucher = '${id_voucher}' AND ID_SuKien = '${id_sukien}' RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Voucher of event updated succesfully",
                    voucher: isUpdated.rows[0]
                    });
                
            }
            return res
                  .status(401)
                  .json({ success: false, message: "Voucher of event updated unsuccesfully" });
            
        } 
        catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }  
    });

    // @route POST api/event/updatevoucheramount
    // @desc POST updatevoucheramount
    // @access Public

    router.post("/updatevoucheramount", async (req, res) => {
        const { id_voucher, id_sukien, soluong } = req.body
        if(!id_voucher || !id_sukien || !soluong)
            res.json({ success: false, messages: "Missing information" });

        const existsVoucherofEvent = await pool.query(`SELECT * FROM Voucher_SuKien WHERE ID_Voucher = '${id_voucher}' AND ID_SuKien = '${id_sukien}';`)
        if (existsVoucherofEvent.rows.length === 0) {
            return res
            .status(400)
            .json({ success: false, message: "Voucher of this Event is not exist" });
        }
        else {
            const voucher_trigia = await pool.query(`SELECT TriGia FROM Voucher WHERE ID_Voucher = '${id_voucher}';`)
            const trigia = voucher_trigia.rows[0]?.trigia
            const amount_left = existsVoucherofEvent.rows[0].soluong - soluong
            const soluongsudung = existsVoucherofEvent.rows[0].soluongsudung + soluong
            const ngansach = trigia * soluongsudung
            if(amount_left < 0) {
                return res
                .status(400)
                .json({ success: false, message: "Amount left of this Event is not enough" });
            }
            else {
                try {
                    const isUpdated = await pool.query(`UPDATE Voucher_SuKien SET soluong = ${amount_left}, soluongsudung = ${soluongsudung}, ngansach = ${ngansach} WHERE ID_Voucher = '${id_voucher}' AND ID_SuKien = '${id_sukien}' RETURNING *;`)
                    if (isUpdated.rowCount > 0) {
                        return res.json({
                            success: true,
                            message: "Voucher updated succesfully",
                            voucher: isUpdated.rows[0].id_voucher,
                            soluongconlai: isUpdated.rows[0].soluong
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
            }
        }
    });

    // @route GET api/detailvoucher
    // @desc Get detail voucher
    // @access Private

    router.get("/detailvoucher/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const detailedVoucher = await pool.query(`SELECT * FROM Voucher WHERE ID_Voucher = '${id}';`)
            if (detailedVoucher.rows.length === 0) {
                return res
                .status(400)
                .json({ success: false, message: "Voucher is not exist" });
            }
            if (detailedVoucher.rowCount > 0) {
                const formatData = await Promise.all(detailedVoucher.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, vouchers: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
        }
    });

    // @route GET api/allvoucher
    // @desc GET allvoucher
    // @access Public

    router.get("/allvoucher", async (req, res) => {
        try {
            const vouchers = await pool.query(`SELECT * FROM Voucher;`)
            if (vouchers.rowCount > 0) {
                const formatData = await Promise.all(vouchers.rows.map(async row => {
                    const brand_name = await pool.query(`SELECT Ten FROM ThuongHieu WHERE ID_ThuongHieu = '${row.id_thuonghieu}';`)
                    return {
                        ...row,
                        brand_name: brand_name.rows[0]?.ten,
                    }
                }))
                res.json({ success: true, vouchers: formatData });
            }
        } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "internal server error",
        });
        }
    });

    router.delete("/allvoucherofevent/:id" , async (req, res) => {
        try {
            const id_event = req.params.id;

            const deleteVoucherSuKien = await pool.query(
                `DELETE FROM Voucher_SuKien WHERE ID_SuKien = $1`, [id_event]
            );         
            if (deleteVoucherSuKien.rowCount >= 0) {
                return res.json({
                    success: true,
                    message: "Voucher successfully deleted",
                });
            }
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
              success: false,
              message: "Internal server error",
            });
        }
    })
    
    return router;
}