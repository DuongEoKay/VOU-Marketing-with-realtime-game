const express = require("express");

module.exports = (pool) => {
    const router = express.Router();

    router.get('/create', async (req,res) => {
        try {
            await pool.query(`
                CREATE TABLE ThuongHieu(ID_ThuongHieu VARCHAR(10) PRIMARY KEY, ID_ChuThuongHieu VARCHAR(50), Ten VARCHAR(100), SMS VARCHAR(11), HinhAnh VARCHAR(300), LinhVuc VARCHAR(30), DiaChi VARCHAR(100), KinhDo VARCHAR(30), ViDo VARCHAR(30), TrangThai BOOLEAN);
                CREATE TABLE Game(ID_Game VARCHAR(10) PRIMARY KEY, Ten VARCHAR(10));
                CREATE TABLE SuKien(ID_SuKien VARCHAR(10) PRIMARY KEY, ID_ThuongHieu VARCHAR(10), ID_Game VARCHAR(10), TenSuKien VARCHAR(100), HinhAnh VARCHAR(300), SoLuongVoucher INT, MoTa TEXT, ThoiGianBatDau TIMESTAMP WITHOUT TIME ZONE, ThoiGianKetThuc TIMESTAMP WITHOUT TIME ZONE, CONSTRAINT FK_SuKien_ThuongHieu FOREIGN KEY (ID_ThuongHieu) REFERENCES ThuongHieu (ID_ThuongHieu));
                CREATE TABLE Voucher(ID_Voucher VARCHAR(10) PRIMARY KEY, Ten VARCHAR(100), QRCode VARCHAR(300), HinhAnh VARCHAR(300), TriGia INT, Diem INT, MoTa TEXT, NgayHetHan TIMESTAMP WITHOUT TIME ZONE, TrangThai BOOL, ID_ThuongHieu VARCHAR(10), CONSTRAINT FK_Voucher_ThuongHieu FOREIGN KEY (ID_ThuongHieu) REFERENCES ThuongHieu(ID_ThuongHieu)); 
                CREATE TABLE Voucher_SuKien (ID_Voucher VARCHAR(10), ID_SuKien VARCHAR(10), SoLuong INT, NganSach INT, PRIMARY KEY (ID_Voucher, ID_SuKien), CONSTRAINT FK_Voucher FOREIGN KEY (ID_Voucher) REFERENCES Voucher(ID_Voucher), CONSTRAINT FK_SuKien FOREIGN KEY (ID_SuKien) REFERENCES SuKien(ID_SuKien));
                CREATE TABLE CauHoi_SuKien (ID_SuKien VARCHAR(10), STT INT, CauHoi VARCHAR(1000) NOT NULL, A VARCHAR(100) NOT NULL, B VARCHAR(100) NOT NULL, C VARCHAR(100) NOT NULL, D VARCHAR(100) NOT NULL, DapAn VARCHAR(100) NOT NULL, PRIMARY KEY (ID_SuKien, STT), CONSTRAINT FK_CauHoi_SuKien FOREIGN KEY (ID_SuKien) REFERENCES SuKien(ID_SuKien));`)
            res.status(200).send({message: "SETUP SUCCESSFULLY"})
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    
    router.get('/insert', async (req,res) => {
        try {
            await pool.query(`
                INSERT INTO ThuongHieu VALUES ('ID00000001', ''  N'Aquafina', '0123456789', 'https://rubicmarketing.com/wp-content/uploads/2022/12/logo-aquafina.jpg', N'Nước giải khát', N'123 Nguyễn Văn Cừ, Quận 5, TP.HCM', '106 0 22’ – 106 054 ’', '10 0 10’ – 10 0 38', true);
                INSERT INTO Game(ID_Game, Ten) VALUES ('GAME00001', N'Shake');
                INSERT INTO Game(ID_Game, Ten) VALUES ('GAME00002', N'Quiz');
                `)

            res.status(200).send({message: "INSERT SAMPLEDATA SUCCESSFULLY"})
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    
    router.get('/drop', async (req, res) => {
        const { thuonghieu } = req.body;
        if (thuonghieu) {
            try {
                await pool.query(`DELETE FROM ThuongHieu WHERE Ten = ${ thuonghieu }`)
                res.status(200).send({message: `Xóa thuong hiệu ${ thuonghieu } thành công`})
            }
            catch (err) {
                console.log(err)
                res.sendStatus(500)
            }
        }
        else {
            try {
                await pool.query(`DROP TABLE CauHoi_SuKien;
                    DROP TABLE Voucher_SuKien;
                    DROP TABLE SuKien;
                    DROP TABLE Game;
                    DROP TABLE Voucher;
                    DROP TABLE ThuongHieu;`)
                res.status(200).send({message: `DROP TABLE SUCCESSFULLY`})
            }
            catch (err) {
                console.log(err)
                res.sendStatus(500)
            }
        }
    }
    )
    
    router.get('/', async (req, res) => {
        try {
            const data = await pool.query('SELECT * FROM ThuongHieu')
            res.status(200).send({data: data.rows})
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })

    return router
}