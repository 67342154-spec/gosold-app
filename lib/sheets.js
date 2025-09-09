import papr from 'papr-js';
export async function getProducts() {
  try {
    const SPREADSHEET_ID = '1tZn_KezFY_roOwfxTUYwO6mSJJTGA9GEVz3cesiDfc0'; // <--- วาง SPREADSHEET_ID
    // ดึงขอ้ มูลจากชตี สาธารณะ
    const productsData = await papr.get(SPREADSHEET_ID);
    // papr-js จะคืนค่าเปน array ของ object โดยอัตโนมัติ
    // โดยใชแ้ ถวแรกเปน key ของ object
    // เราต้องแปลง price จาก string เปน number
    const formaedProducts = productsData.map(product => ({
      ...product,
      price: Number(product.price) || 0, // แปลงเปน ตัวเลข, ถ้าผิดพลาดให้เปน 0
    }));
    return formaedProducts;
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return []; // คืนค่าเปน array วา่ งถ้าเกิดขอ้ ผิดพลาด
  }
}