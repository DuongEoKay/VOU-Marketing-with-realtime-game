const express = require("express");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");

module.exports = (pool) => {
    const router = express.Router();

    router.get("/", verifyToken, async (req, res) => {
        try {
            const brand = await pool.query(`SELECT * FROM ThuongHieu WHERE ID_ThuongHieu = '${req.ID_ThuongHieu}'`)
            if (!brand) {
                return res
                .status(400)
                .json({ success: false, message: "Brand not found" });
            }
            res.json({ success: true, brand: brand.rows[0] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    });

    // @route POST api/brand/register
    // desc Register brand
    // @access Public

    router.post("/register", async (req, res) => {
        const { sms, ten, matkhau } = req.body;
    
        if (!sms || !ten || !matkhau) {
        return res
            .status(400)
            .json({ success: false, message: "Missing information" });
        }
        try {
            const existSms = await pool.query(`SELECT * FROM ThuongHieu WHERE SMS = '${sms}'`)
            if (existSms.rows.length > 0) {
                return res
                .status(400)
                .json({ success: false, message: "Brand is already in use" });
            }

            const getLastID = await pool.query(`
                SELECT ID_ThuongHieu FROM ThuongHieu 
                ORDER BY ID_ThuongHieu DESC 
                LIMIT 1;
            `);
            
            let newID;
            if (getLastID.rowCount > 0) {
                const lastID = getLastID.rows[0].id_thuonghieu;
                const numericPart = parseInt(lastID.slice(2), 10);
                const incrementedID = numericPart + 1;
            
                newID = 'ID' + incrementedID.toString().padStart(8, '0');
            } else {
                newID = 'ID00000001';
            }

            const newBrand = await pool.query(`INSERT INTO ThuongHieu(ID_ThuongHieu, SMS, Ten, MatKhau, TrangThai) VALUES ('${newID}', '${sms}', '${ten}', '${matkhau}', true) RETURNING *;`)
            var accessToken;

            if(newBrand.rowCount > 0) {
                accessToken = jwt.sign(
                    { ID_ThuongHieu: newID },
                    process.env.ACCESS_TOKEN
                );
            }
        
            res.json({
                success: true,
                message: "Create new brand successfully",
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

    router.post("/login", async (req, res) => {
        const { sms, matkhau } = req.body;
      
        if (!sms || !matkhau) {
          return res
            .status(400)
            .json({ success: false, message: "Missing sms and/or password" });
        }
        try {
          const existSms = await pool.query(`SELECT * FROM ThuongHieu WHERE SMS = '${sms}'`)
          if (existSms.rows.length === 0) {
            return res
              .status(400)
              .json({ success: false, message: "Error in SMS or password" });
          }
          if (existSms.rows[0].matkhau !== matkhau) {
            return res
              .status(400)
              .json({ success: false, message: "Wrong password" });
          }
          const accessToken = jwt.sign(
            { ID_ThuongHieu: existSms.rows[0].id_thuonghieu },
            process.env.ACCESS_TOKEN
          );
          res.json({
            success: true,
            message: "Brand logged in successfully",
            accessToken,
            sms: existSms.rows[0].sms,
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Internal server error",
          });
        }
    });

    router.get("/allbrand", async (req, res) => {
        const allBrand = await pool.query(`SELECT * FROM ThuongHieu;`)
        res.json({ success: true, brands: allBrand.rows });
    });
      
    // update brand
    router.put("/:id", verifyToken, async (req, res) => {
        const {  
            ten, 
            sms, 
            password, 
            hinhanh,
            linhvuc,
            diachi
        } = req.body;

        let updateParam = "";

        let conditions = [];

        conditions.push(`ten = '${ten}'`);
        conditions.push(`sms = '${sms}'`);
        conditions.push(`matkhau = '${password}'`);
        conditions.push(`hinhanh = '${hinhanh}'`);
        conditions.push(`linhvuc = '${linhvuc}'`);
        conditions.push(`diachi = '${diachi}'`);

        if (conditions.length > 0) {
            updateParam = conditions.join(' , ');
        }
      
        try {
            const existSms = await pool.query(`SELECT * FROM ThuongHieu WHERE SMS = '${sms}' AND ID_ThuongHieu != '${req.params.id}';`)
            if (existSms.rows.length !== 0) {
                return res
                .status(400)
                .json({ success: false, message: "SMS is already in use" });
            }
      
            const isUpdated = await pool.query(`UPDATE ThuongHieu SET ${updateParam} WHERE ID_ThuongHieu = '${req.params.id}' RETURNING *;`)

            if (isUpdated.rowCount > 0) {
                return res.json({
                    success: true,
                    message: "Brand updated succesfully",
                    brand: isUpdated.rows[0]
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