const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

module.exports = (pool) => {
    const router = express.Router();

    router.get("/", verifyToken, async (req, res) => {
        try {
        const voucher = await pool.query(`SELECT * FROM Voucher WHERE ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
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
        const { ten, qrcode, hinhanh, trigia, mota, ngayhethan } = req.body;
    
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

            const id_thuonghieu = req.ID_ThuongHieu

            const newVoucher = await pool.query(`INSERT INTO Voucher(ID_Voucher, ID_ThuongHieu, ten, qrcode, hinhanh, trigia, mota, ngayhethan, trangthai) VALUES ('${newID}', '${id_thuonghieu}', '${ten}', '${tmp_qrcode}', '${tmp_hinhanh}', ${trigia}, '${mota}', '${ngayhethan}', true) RETURNING *;`)
        
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
        try {
            const id_voucher = req.params.id;
            const existVoucher = await pool.query(`SELECT * FROM Voucher WHERE ID_Voucher = '${id_voucher}' AND ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
        
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
                    [id_voucher, req.ID_ThuongHieu]
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
        let { qrcode, hinhanh, trigia, mota, ngayhethan, trangthai } = req.body

        let updateParam = "";

        let conditions = [];

        if (qrcode) conditions.push(`qrcode = '${qrcode}'`);
        if (hinhanh) conditions.push(`hinhanh = '${hinhanh}'`);
        if (trigia && trigia > 0) conditions.push(`trigia = ${trigia}`);
        if (mota) conditions.push(`mota = '${mota}'`);
        if (ngayhethan) conditions.push(`ngayhethan = '${ngayhethan}'`);
        if (trangthai) conditions.push(`trangthai = ${trangthai}`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }

        try {
            const isUpdated = await pool.query(`UPDATE Voucher SET ${updateParam} WHERE ID_Voucher = '${req.params.id}' AND ID_ThuongHieu = '${req.ID_ThuongHieu}' RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Voucher updated succesfully",
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


    // @route POST api/voucher/createvoucherevent
    // desc Create voucher
    // @access Public

    router.post("/createvoucherevent", verifyToken, async (req, res) => {
        const { id_voucher, id_sukien, soluong, ngansach } = req.body;
    
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

            const newVoucher = await pool.query(`INSERT INTO Voucher_SuKien (ID_Voucher, ID_SuKien, SoLuong, NganSach) VALUES ($1, $2, $3, $4) RETURNING *`,
                                                [id_voucher, id_sukien, soluong, ngansach])

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

    router.get("/voucherofevent/:id", verifyToken, async (req, res) => {
        const id_sukien = req.params.id;
        try {
        const voucher = await pool.query(`SELECT * FROM Voucher_SuKien WHERE ID_SuKien = '${id_sukien}'`)
        if (!voucher) {
            return res
            .status(400)
            .json({ success: false, message: "There is no voucher of event" });
        }
        res.json({ success: true, voucher: voucher.rows });
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
                    event: isUpdated.rows[0]
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
            const amount_left = existsVoucherofEvent.rows[0].soluong - soluong
            if(amount_left < 0) {
                return res
                .status(400)
                .json({ success: false, message: "Amount left of this Event is not enough" });
            }
            else {
                try {
                    const isUpdated = await pool.query(`UPDATE Voucher_SuKien SET soluong = ${amount_left} WHERE ID_Voucher = '${id_voucher}' AND ID_SuKien = '${id_sukien}' RETURNING *;`)
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

    return router;
}