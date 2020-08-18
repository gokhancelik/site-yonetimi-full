/*** Hesap Hareketlerini Sil****/
delete from HesapHareketi
--select * from HesapHareketi
where tahsilatId in (select id
    from Tahsilat
    where odemeYontemi <> 1) OR tahsilatId is null


/*** Tahsilat Kalemlerini Sil****/
select *
from TahsilatKalem
--delete from TahsilatKalem 
where tahsilatId in (select id
from Tahsilat
where odemeYontemi <> 1)

/*** tahakkukları  Güncelle****/
update Tahakkuk set durumu = 0
--select * from Tahakkuk
where id not in (select tk.tahakkukId
    from Tahsilat t join TahsilatKalem tk on tk.tahsilatId = t.id
    where odemeYontemi <>1) and durumu = 1

/*** Cüzdanı Sil****/
delete from KisiCuzdan

/*** Tahsilatları Sil****/
select *
from Tahsilat
where odemeYontemi <>1
delete from Tahsilat where odemeYontemi <>1

/*** Ödeme aktarımlarını aktarılmamış yap****/
update OdemeAktarimi set islenenTutar = 0 where islenenTutar > 0

select count(*)
from OdemeAktarimi
where islenenTutar < odenenTutar
select *
from OdemeAktarimi
select *
from KisiCuzdan
