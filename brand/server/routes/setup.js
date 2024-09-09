const express = require("express");

module.exports = (pool) => {
    const router = express.Router();

    router.get('/create', async (req,res) => {
        try {
            await pool.query(`
                CREATE TABLE ThuongHieu(ID_ThuongHieu VARCHAR(10) PRIMARY KEY, ID_ChuThuongHieu VARCHAR(50), Ten VARCHAR(100), SMS VARCHAR(11), HinhAnh VARCHAR(300), LinhVuc VARCHAR(30), DiaChi VARCHAR(100), KinhDo VARCHAR(30), ViDo VARCHAR(30), TrangThai BOOLEAN);
                CREATE TABLE SuKien(ID_SuKien VARCHAR(10) PRIMARY KEY, ID_ThuongHieu VARCHAR(10), ID_Game VARCHAR(50), TenSuKien VARCHAR(100), HinhAnh VARCHAR(300), SoLuongVoucher INT, MoTa TEXT, ThoiGianBatDau TIMESTAMP WITHOUT TIME ZONE, ThoiGianKetThuc TIMESTAMP WITHOUT TIME ZONE, CONSTRAINT FK_SuKien_ThuongHieu FOREIGN KEY (ID_ThuongHieu) REFERENCES ThuongHieu (ID_ThuongHieu));
                CREATE TABLE Voucher(ID_Voucher VARCHAR(10) PRIMARY KEY, Ten VARCHAR(100), QRCode VARCHAR(300), HinhAnh VARCHAR(300), TriGia INT, Diem INT, MoTa TEXT, NgayHetHan TIMESTAMP WITHOUT TIME ZONE, TrangThai BOOL, ID_ThuongHieu VARCHAR(10), CONSTRAINT FK_Voucher_ThuongHieu FOREIGN KEY (ID_ThuongHieu) REFERENCES ThuongHieu(ID_ThuongHieu)); 
                CREATE TABLE Voucher_SuKien (ID_Voucher VARCHAR(10), ID_SuKien VARCHAR(10), SoLuong INT, SoLuongSuDung INT, NganSach INT, PRIMARY KEY (ID_Voucher, ID_SuKien), CONSTRAINT FK_Voucher FOREIGN KEY (ID_Voucher) REFERENCES Voucher(ID_Voucher), CONSTRAINT FK_SuKien FOREIGN KEY (ID_SuKien) REFERENCES SuKien(ID_SuKien));
                CREATE TABLE CauHoi_SuKien (ID_SuKien VARCHAR(10), STT INT, CauHoi VARCHAR(1000) NOT NULL, A VARCHAR(100) NOT NULL, B VARCHAR(100) NOT NULL, C VARCHAR(100) NOT NULL, D VARCHAR(100) NOT NULL, DapAn VARCHAR(100) NOT NULL, PRIMARY KEY (ID_SuKien, STT), CONSTRAINT FK_CauHoi_SuKien FOREIGN KEY (ID_SuKien) REFERENCES SuKien(ID_SuKien));`)
            res.status(200).send({message: "SETUP SUCCESSFULLY"})
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    
    router.get('/drop', async (req, res) => {
        // try {
        //     await pool.query(`DROP TABLE CauHoi_SuKien;
        //         DROP TABLE Voucher_SuKien;
        //         DROP TABLE SuKien;
        //         DROP TABLE Game;
        //         DROP TABLE Voucher;
        //         DROP TABLE ThuongHieu;`)
        //     res.status(200).send({message: `DROP TABLE SUCCESSFULLY`})
        // }
        try {
            await pool.query(`DROP TABLE CauHoi_SuKien;
                DROP TABLE Voucher_SuKien;
                DROP TABLE SuKien;
                DROP TABLE Voucher;
                DROP TABLE ThuongHieu;`)
            res.status(200).send({message: `DROP TABLE SUCCESSFULLY`})
        }
        catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    })
    
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