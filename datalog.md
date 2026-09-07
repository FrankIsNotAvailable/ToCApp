# Data Log

บันทึกสรุปทุกครั้งที่มีการอ่าน/เขียน/แก้ไขไฟล์ในโปรเจกต์นี้ (ไฟล์นี้ไม่ commit ขึ้น git)

## ภาพรวมโดยละเอียด: HomeDataAvaliable.svelte + DataCard.svelte

ส่วนนี้อธิบายโครงสร้าง/สถานะปัจจุบันของ 2 component หลักที่ทำงานด้วยกัน (อัปเดตล่าสุด 2026-08-24 — ถ้าแก้โค้ดต่อควรอัปเดตส่วนนี้ให้ตรงด้วย)

### `src/components/HomeDataAvaliable.svelte` — หน้าโฮมแสดงรายการ "masked data"

**หน้าที่**: เป็นหน้าหลักที่แสดงรายการข้อมูลที่ถูก mask ไว้ (การ์ด), จัดการ pagination, พื้นหลังภาพเบลอ, และปุ่มเพิ่มข้อมูล

**Props/State ในไฟล์**:
- `items: MaskedData[]` ($state) — mock data 3 รายการ (ในอนาคตจะแทนที่ด้วยข้อมูลจริง โครงสร้างเดิมไม่ต้องแก้)
- `page: number` ($state) — หน้าปัจจุบันของ pagination (เริ่มที่ 0)
- `navbarHeight: number` ($state) — ความสูงจริงของ navbar วัดจาก DOM (อธิบายด้านล่าง)
- `totalPages`, `pageItems` ($derived) — คำนวณจาก `items`/`page`/`PAGE_SIZE`
- ค่าคงที่: `CARD_HEIGHT = 110` (ความสูงคงที่ของการ์ดทุกใบ, ถูกปรับลดหลายรอบจาก 222→160→130→110 เพื่อให้พอดีจอผู้ใช้), `PAGE_SIZE = 3` (จำนวนการ์ดต่อหน้า)

**กลไกสำคัญที่ควรรู้ก่อนแก้ต่อ**:
1. **ปัญหา parent ไม่ใช่ flex container**: `+page.svelte` (นอกขอบเขตที่แก้ได้) ห่อ component นี้ด้วย `<div class="mx-auto my-auto">` ที่ไม่ใช่ flex container ทำให้เทคนิค flexbox shrink-to-fit ใดๆ ที่พึ่งพา parent จะไม่ทำงาน วิธีแก้ที่ใช้อยู่คือทำ content wrapper เป็น `position: fixed` แทน (ไม่ขึ้นกับ parent เลย)
2. **วัดความสูง navbar เอง**: เพราะ parent ไม่ช่วยจัด layout ให้ จึงต้อง `onMount` + `document.querySelector('.navBar').getBoundingClientRect()` วัดความสูง navbar จริงแบบ read-only (ไม่แก้ไฟล์ NavBar) แล้วเอาไปกำหนด `top: {navbarHeight}px` ให้ content wrapper วางพอดีใต้ navbar เสมอ มี resize listener คอย update
3. **ทำไมการ์ดเป็นความสูงคงที่ ไม่ dynamic**: เคยลองคำนวณความสูงการ์ดแบบ dynamic ตามพื้นที่ที่เหลือ/จำนวนรายการ (`recomputeLayout`) แต่เจอปัญหา flexbox shrink edge case ทำให้การ์ดบางใบหายไปทั้งใบ (ไม่ใช่แค่ถูกบีบ) และ verify ในเบราว์เซอร์จริงไม่ได้ (เครื่องนี้ไม่มี browser automation) สุดท้ายผู้ใช้ตัดสินใจกลับไปใช้ **ความสูงคงที่ทุกใบ** (ลบรายการไหนไปก็ไม่กระทบขนาดที่เหลือ) แล้วใช้ pagination + ปรับตัวเลข CARD_HEIGHT ลงเรื่อยๆ แทนการคำนวณอัตโนมัติ
4. **Empty state**: ถ้า `items.length === 0` จะสลับไปโชว์ปุ่ม + (`addbuttondata.png`) กับข้อความ "no data available. create one!" แทนรายการการ์ด+pagination ทั้งหมด
5. **Pagination**: แสดงเสมอ (ไม่ซ่อนแม้มีแค่หน้าเดียว เพราะ Figma ออกแบบให้ dots เป็น static element) ปุ่มลูกศรจะ `disabled` เองเมื่อถึงหน้าแรก/สุดท้าย
6. **ปุ่ม "+" มุมขวาล่าง**: ลิงก์ (`<a>`) ไปหน้า `/create-data` ใช้รูป `addbuttondata.png` เดียวกับใน empty state
7. **พื้นหลัง**: 2 เลเยอร์ `fixed inset-0` ซ้อนกัน — เลเยอร์ล่างเป็นรูปภาพจริง (`c71142e3f4c96fe87cc9c63e3365df4dec3e1160.png`) ที่ `opacity-[44%] mix-blend-luminosity`, เลเยอร์บนเป็น `backdrop-blur-[52px]` เปล่าๆ (ให้ภาพด้านหลังเบลอฟุ้ง ตาม effect "Background blur" ใน Figma)

**สิ่งที่เบี่ยงจาก Figma spec ตรงๆ (ตั้งใจ)**: ขนาดการ์ด/ไอคอน/ตัวอักษรทั้งหมดถูกลดสัดส่วนลงจากตัวเลข Figma ดั้งเดิม (222px/128px/36px/24px) เพื่อให้พอดีจอผู้ใช้จริงตามที่ขอ ไม่ใช่ตัวเลข pixel-perfect จาก Figma อีกต่อไป

### `src/components/DataCard.svelte` — การ์ดแสดงข้อมูล 1 รายการ

**Props**:
- `data: MaskedData` — ข้อมูล 1 รายการ (`id`, `fields: string[]`, `createdAt: Date`, `editedAt: Date | null`)
- `onEdit?: (id: string) => void`, `onDelete?: (id: string) => void` — callback จาก parent
- `height?: number` — ความสูงเป็น px (default 222 แต่ parent ปัจจุบันส่ง `CARD_HEIGHT` มา override เสมอ) ใส่เป็น inline `style="height: {height}px"` ตรงๆ ไม่ใช่ Tailwind class เพราะค่าคำนวณ/เปลี่ยนได้จาก parent

**โครงสร้าง UI ปัจจุบัน** (ตัวเลขล่าสุดหลังลดสัดส่วนหลายรอบ):
- การ์ด: `rounded-[22px]`, พื้นหลัง `bg-white/[0.34]` (ขาวโปร่งแสง 34%), เงา `shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]` (ลดจาก blur 63px ตาม Figma เหลือ 16px เพราะ blur เดิมกว้างเกินจนดูเป็นก้อนเบลอ), มี `hover:scale-[1.03]` (ขยายเล็กน้อยตอน hover ตาม comment "card-hover → bigger" ใน Figma)
- ไอคอนโฟลเดอร์: รูปจริง `foderimg.png` ขนาด `h-16 w-16` (64px, ลดจาก 128px เดิม) + เส้นแบ่งแนวตั้ง (`w-px bg-black/25`) สูงเท่ากับไอคอน คั่นระหว่างไอคอนกับข้อความ
- ข้อความหัวข้อ ("Data: ..."): `text-[28px]` (ลดจาก 36px), font Iosevka Charon (ผ่าน class `font-masked-data`), weight 400, `leading-[1.2]` (**ไม่ใช้ค่า `leading-[18px]` ตรงจาก Figma** เพราะ Figma ใช้กล่องข้อความอิสระแยกตำแหน่งกันเอง แต่โค้ดนี้ stack `<p>` ต่อกันจริง ถ้าใช้ line-height ตรงจาก Figma ตัวอักษรจะซ้อนทับกัน — เป็นบั๊กที่เจอและแก้ไปแล้ว)
- ข้อความ created/edited: `text-[18px]` (ลดจาก 24px), สี `#767676`, `leading-[1.2]` เหตุผลเดียวกับข้างบน
- ปุ่มลบ/แก้ไข: วงกลม `h-12 w-12` (48px, ลดจาก 64px) พื้นหลัง `bg-white/[0.34]` + เงาเดียวกับการ์ด (ลด blur เหตุผลเดียวกัน) วางแบบ `absolute bottom-4 right-6` (ยึดมุมล่างขวาของการ์ด ไม่ใช่กึ่งกลางแนวตั้งแบบเดิม) — ปุ่มลบใช้รูปจริง `remove.png`, ปุ่มแก้ไขยังเป็น inline SVG (ยังไม่มีไฟล์ไอคอน edit ใน assets)

**หมายเหตุ**: ก่อนหน้านี้เคยย้ายปุ่มลบ/แก้ไขไปมุมล่าง**ซ้าย**ตามคำขอ แต่ภายหลังไฟล์เปลี่ยนกลับมาเป็นขวาเอง (ไม่แน่ใจว่าผู้ใช้แก้เองหรือเปล่า) ปัจจุบันคงตำแหน่ง **ขวา** ไว้ตามสถานะไฟล์ล่าสุด

### `src/types/MaskedData.ts`
Type เดียว: `{ id: string; fields: string[]; createdAt: Date; editedAt: Date | null }` — ยังไม่มีการเชื่อมกับ backend/service จริง เป็นแค่โครงร่างสำหรับ mock data ใน `HomeDataAvaliable.svelte`

### ฟอนต์ร่วม: `--font-masked-data` (app.css)
เพิ่ม token `--font-masked-data: 'Iosevka Charon', monospace;` ใน `@theme` block ของ `app.css` (Tailwind v4 auto-gen utility class `font-masked-data`) ใช้แทน `font-['Iosevka_Charon']` ที่เคยพิมพ์ซ้ำทุกจุด — ตั้งใจตั้งชื่อเจาะจงว่า "masked-data" ไม่ใช่ชื่อกลางๆ เพราะยังไม่รู้ว่า design system อื่นจะใช้ฟอนต์นี้ด้วยหรือไม่

## บันทึกไทม์ไลน์ (ละเอียดทุกการแก้ไข)

### 2026-08-24

- สร้าง `src/components/DataCard.svelte` — component การ์ดแสดงข้อมูล 1 รายการ รับ props `data: MaskedData`, `onEdit`, `onDelete`
- สร้าง `src/types/MaskedData.ts` — type ของข้อมูล 1 รายการ (`id`, `fields`, `createdAt`, `editedAt`)
- แก้ `src/components/HomeDataAvaliable.svelte` — ลูปแสดง `DataCard` จาก mock array, เพิ่ม heading "masked data" (font Iosevka Charon, text-center, size 40px), เพิ่มพื้นหลัง gradient (opacity 44%, mix-blend-luminosity) และ padding/corner radius ตาม spec Figma
- แก้ `src/app.css` — เพิ่ม `@import` ฟอนต์ "Iosevka Charon" (ตัวไม่ Mono) จาก Google Fonts
- แก้ `DataCard.svelte` — เพิ่ม border (3px, #666666) และ min-height 222px ตาม spec Figma
- แก้ `src/routes/+page.svelte` — คืนค่า div ครอบ `<HomeDataAvaliable />` กลับมาตามต้นฉบับ
- ยืนยันแล้วว่า `src/components/NavBar.svelte` ไม่ถูกแก้ไขเลยตลอด session นี้
- แก้ `src/components/HomeDataAvaliable.svelte` — เปลี่ยนพื้นหลังจาก gradient จำลอง มาใช้รูปจริง `src/lib/assets/c71142e3f4c96fe87cc9c63e3365df4dec3e1160.png` (ผู้ใช้วางไฟล์ไว้เอง) แทน โดยยังคง opacity 44% และ mix-blend-luminosity ตาม spec Figma
- แก้ `src/components/HomeDataAvaliable.svelte` — ทำพื้นหลังเป็น `fixed inset-0` เต็มจอ (ไม่ครอบเป็นกล่องแยกจาก navbar อีกต่อไป, ไม่แตะ NavBar.svelte) และขยาย container การ์ดจาก `max-w-3xl` เป็น `max-w-5xl` ให้กว้างขึ้นตาม Figma
- แก้ `src/components/HomeDataAvaliable.svelte` — เพิ่ม layer `backdrop-blur-[52px]` ทับพื้นหลังภาพ ตาม effect "Background blur: 52" ที่เจอใน Figma (Group 1047)
- แก้ `src/components/DataCard.svelte` — ปรับตาม spec ของ "Rectangle 15" ใน Figma: corner radius 22px, fill สีขาว opacity 34%, drop shadow (X0 Y4 Blur63 Spread0, #000000 25%), สูง 222px (เอา border 3px #666666 ออก เพราะ layer นี้ใน Figma ไม่มี border section)
- แก้ `HomeDataAvaliable.svelte` + `DataCard.svelte` — แก้ปัญหาหน้าเลื่อนขึ้นลง โดยใช้กลไก flexbox shrink (`flex-1 min-h-0 overflow-hidden`) แทนความสูงตายตัว: content wrapper และ list ยืดหดตามพื้นที่ที่เหลือใต้ navbar อัตโนมัติ (ไม่ต้อง hardcode navbar height, ไม่แตะ RootLayout/NavBar), การ์ดแต่ละใบยังคง cap สูงสุดที่ 222px ตาม Figma แต่จะหดลงถ้าจอเตี้ยเกินไปแทนที่จะดันให้ล้นจอ
- แก้ `DataCard.svelte` — ลด blur ของเงา (drop shadow) จาก 63px เหลือ 16px เพราะเงาที่ blur 63 (ตาม spec Figma ตรงๆ) แผ่กว้างเกินขอบการ์ดจนดูเป็นก้อนเบลอครอบทั้งพื้นหลัง
- แก้ `DataCard.svelte` — เปลี่ยนไอคอนโฟลเดอร์และไอคอนลบจาก inline SVG มาใช้รูปจริงจาก `src/lib/assets/foderimg.png` และ `src/lib/assets/remove.png` (ผู้ใช้วางไฟล์ไว้เอง), เพิ่ม hover effect ให้การ์ดขยายขึ้นเล็กน้อยตอน hover (`hover:scale-[1.03]` ตาม comment "card-hover → bigger" ใน Figma), ปรับ style ข้อความหัวข้อการ์ด ("Data: ...") ตาม Figma spec: font Iosevka Charon, weight 400, size 36px, line-height 18px (ปุ่ม edit ยังใช้ SVG เดิมเพราะยังไม่มีไฟล์ไอคอน edit ใน assets)
- แก้ `DataCard.svelte` — ปรับ style ข้อความ "created:"/"edited:" ตาม Figma spec: font Iosevka Charon, weight 400, size 24px, line-height 18px, สี #767676 (ไม่ได้ใส่ text-center ตามที่ Figma ระบุไว้ เพราะข้อความอยู่ชิดซ้ายคู่กับไอคอนโฟลเดอร์อยู่แล้ว การจัดกึ่งกลางไม่มีผลต่างที่เห็นได้)
- แก้ `DataCard.svelte` — แก้บั๊กตัวอักษรซ้อนทับกัน (title 36px กับ created/edited 24px ชนกันตอน hover ขยาย) โดยเปลี่ยน line-height จากค่า literal 18px ของ Figma (ซึ่งแคบกว่าฟอนต์มาก ใช้ได้เฉพาะตอนเป็นกล่องข้อความอิสระใน Figma) มาเป็น `leading-[1.2]` ที่พอดีกับขนาดฟอนต์จริงเมื่อ stack กันในโค้ด และเพิ่ม `gap-2` ระหว่าง title กับกลุ่ม created/edited
- แก้ `HomeDataAvaliable.svelte` — เจอบั๊กเดียวกันที่หัวข้อ "masked data" (text-[40px] กับ leading-[18px]) แก้เป็น `leading-[1.2]` เหมือนกัน; พยายามเปิด dev server + browser อัตโนมัติเพื่อวัด scroll จริงแต่เครื่องนี้ไม่มี chromium-cli/browser automation ติดตั้งไว้ เลยตรวจสอบด้วยการอ่าน CSS/flexbox chain แทน (ยังไม่ได้ verify ผลจริงในเบราว์เซอร์)
- แก้ `HomeDataAvaliable.svelte` — พบสาเหตุจริงของปัญหาเลื่อนหน้า: `+page.svelte` (นอกขอบเขตที่แก้ได้) ห่อ `<HomeDataAvaliable />` ด้วย `<div class="mx-auto my-auto">` ที่ไม่ใช่ flex container ทำให้ `flex-1`/`min-h-0` shrink chain ที่ทำไว้ก่อนหน้าไม่มีผลอะไรเลย (ไม่มี flex parent ให้ยึด) แก้โดยไม่แตะ +page.svelte: เปลี่ยน content wrapper เป็น `position: fixed` วัดความสูง navbar จริงด้วย `onMount` + `getBoundingClientRect()` (query `.navBar` แบบ read-only ไม่แก้ไฟล์ NavBar) แล้ววาง content ให้เต็มพื้นที่ที่เหลือใต้ navbar ตรงๆ ผ่าน inline style `top: {navbarHeight}px` — วิธีนี้ไม่ขึ้นกับว่าพ่อแม่เป็น flex หรือไม่
- แก้ `DataCard.svelte` — เพิ่มเส้นแบ่งแนวตั้ง (divider bar) ระหว่างไอคอนโฟลเดอร์กับข้อความ ตามภาพ mockup ที่ผู้ใช้ส่งมา (จุดที่ขาดไปก่อนหน้านี้) ส่วนวงกลมไอคอนมุมขวาบนในภาพ (ลูกโป่ง comment ของ Figma) ไม่ใช่ส่วนหนึ่งของดีไซน์จริง เลยไม่ได้เพิ่มอะไรสำหรับจุดนั้น (ของเดิมไม่มีอยู่แล้ว)
- แก้ `DataCard.svelte` — ปรับตาม Figma spec ใหม่: ไอคอนโฟลเดอร์และเส้นแบ่งขยายเป็น 128px (จาก "image 19" layer), ปุ่มลบ/แก้ไขเปลี่ยนจากวงกลมไม่มีพื้นหลังเป็นวงกลม 64px ที่มีพื้นหลังขาว opacity 34% + drop shadow ตาม "Ellipse 8" layer (ลด blur จาก 63px เหลือ 16px เหมือนที่ทำกับเงาการ์ดไปก่อนหน้า เพราะ blur 63 บนวงกลม 64px จะกลายเป็นก้อนเบลอใหญ่กว่าตัวปุ่มเอง)
- แก้ `HomeDataAvaliable.svelte` + `DataCard.svelte` — พบว่าหลังไอคอนขยายเป็น 128px การ์ดใบที่ 3 หายไปทั้งใบ (ไม่ได้แค่ถูกบีบ) เพราะกลไก flexbox shrink (flex-1/min-h-0) ที่ใช้อยู่มีเงื่อนไข edge case ที่ไม่น่าเชื่อถือพอเมื่อเนื้อหาแต่ละใบไม่เท่ากันและวัดผ่านเบราว์เซอร์จริงไม่ได้ในเครื่องนี้ เปลี่ยนมาใช้วิธีคำนวณความสูงการ์ดแบบ deterministic ด้วย JS แทน: วัด navbar height, ความสูงหัวข้อ "masked data" จริง, แล้วคำนวณ `cardHeight = (พื้นที่เหลือใต้จอ - padding - header - gap) / จำนวนการ์ด` (cap ไว้ที่ 90–222px) ส่ง `height` prop ไปให้ `DataCard` ใช้เป็น inline style ตรงๆ แทนการพึ่ง flex-shrink คำนวณเอง
- แก้ `DataCard.svelte` — ย้ายปุ่มลบ/แก้ไขจากชิดขวา-กึ่งกลางแนวตั้ง ไปเป็น absolute ที่มุมล่างซ้ายของการ์ด (`absolute bottom-4 left-6`) ตามที่ผู้ใช้ระบุชัดเจน (ต่างจาก Figma ที่วางไว้ชิดขวา) — ตั้ง card เป็น `relative` เพื่อรองรับ; หมายเหตุ: อาจซ้อนทับกับไอคอนโฟลเดอร์ถ้าการ์ดถูกบีบเตี้ยมากๆ เพราะไอคอนสูง 128px เกือบเต็มความสูงการ์ดอยู่แล้ว
- (สังเกต: ปุ่ม delete/edit ใน DataCard.svelte เปลี่ยนกลับเป็น `right-6` เองระหว่างทาง ไม่ทราบว่าผู้ใช้แก้เองหรือไม่ ไม่ได้แตะกลับ)
- แก้ `HomeDataAvaliable.svelte` — ตามที่ผู้ใช้ขอ: (1) เปลี่ยนการ์ดกลับเป็นความสูงคงที่ `CARD_HEIGHT = 222` เสมอ ไม่คำนวณ dynamic ตามพื้นที่/จำนวนรายการอีกต่อไป (ลบเมื่อไหร่การ์ดที่เหลือก็ขนาดเท่าเดิม), (2) เพิ่ม pagination: แบ่งแสดงทีละ `PAGE_SIZE = 3` รายการ พร้อมปุ่มลูกศรซ้าย/ขวา + จุด indicator ใต้รายการการ์ด, (3) เพิ่มปุ่ม "+" ลอยมุมขวาล่าง (`fixed bottom-6 right-6`) ที่เป็นลิงก์ไปหน้า `/create-data`
- สร้าง `src/routes/create-data/+page.svelte` — หน้าเปล่า (แค่ import NavBar) เป็น placeholder รองรับปุ่ม "+" ที่ route ไปหา ตามที่ผู้ใช้บอกว่า "จะว่างเอาไว้ก่อน" — ไฟล์นี้อยู่นอกขอบเขต HomeDataAvaliable/DataCard ที่ตกลงไว้ แต่จำเป็นเพื่อให้ปุ่มใช้งานได้จริงตามที่ขอ
- แก้ `HomeDataAvaliable.svelte` — เจอบั๊ก: pagination bar ถูกซ่อนด้วย `{#if totalPages > 1}` ทำให้ตอนนี้ (มี mock data แค่ 3 รายการ, PAGE_SIZE=3) totalPages=1 เลยไม่โชว์ pagination เลยทั้งที่ Figma แสดง dots ไว้เสมอเป็น element ของดีไซน์ — เอา `{#if}` ออก ให้ pagination bar โชว์ตลอด (ปุ่มลูกศรจะ disabled เองถ้ามีแค่หน้าเดียว)
- แก้ `HomeDataAvaliable.svelte` — หลังเปลี่ยนการ์ดเป็นความสูงคงที่ 222px ผู้ใช้แจ้งว่าเลื่อนหน้าลงไม่ได้เลย เพิ่ม `overflow-y-auto` ให้ content wrapper ไปก่อนหน้านี้
- ผู้ใช้ยืนยันว่าที่จอตัวเองตอนนี้ (222px, pagination, ปุ่ม +) พอดีจอสวยงามตรงกับ Figma อยู่แล้วไม่ต้องเลื่อน เลยเอา `overflow-y-auto` ที่เพิ่งเพิ่มไปออกจาก `HomeDataAvaliable.svelte` ตามที่ขอ (กลับไปเป็น fixed ไม่มี scroll เหมือนก่อนหน้า)
- แก้ `HomeDataAvaliable.svelte` + `DataCard.svelte` — ผู้ใช้แจ้งว่าการ์ดทะลุหน้าจอ ลด `CARD_HEIGHT` จาก 222px เหลือ 160px และลดไอคอนโฟลเดอร์/เส้นแบ่งจาก 128px (h-32) เหลือ 96px (h-24) ตามสัดส่วน เพื่อไม่ให้ไอคอนล้นออกจากพื้นที่การ์ดที่เล็กลง
- ผู้ใช้ขอลดขนาดการ์ดลงอีก (การ์ดใบที่ 3 ยังโผล่ไม่พอ) — พบว่าตัวที่กินพื้นที่จริงๆไม่ใช่ไอคอนแล้ว แต่เป็นบล็อกข้อความ (title 36px + created/edited 24px×2) ที่สูงกว่าไอคอน 96px ไปแล้ว เลยลดทั้งชุด: `CARD_HEIGHT` 160→130px, padding การ์ด py-5→py-4, ไอคอน/เส้นแบ่ง 96px(h-24)→64px(h-16), title 36px→28px, created/edited 24px→18px, ปุ่มลบ/แก้ไข 64px(h-16)→48px(h-12) ให้สัดส่วนเข้ากับการ์ดที่เล็กลง (เบี่ยงจาก Figma spec ตัวเลขเดิม เพื่อให้พอดีจอตามที่ขอ)
- แก้ `HomeDataAvaliable.svelte` — เพิ่ม empty state: ถ้า `items.length === 0` โชว์ปุ่ม + (รูป `src/lib/assets/addbuttondata.png` ที่ผู้ใช้วางไว้เอง) ตรงกลางพร้อมข้อความ "no data available. create one!" ลิงก์ไปหน้า `/create-data` แทนที่รายการการ์ด+pagination (ปุ่ม + ลอยมุมขวาล่างยังคงอยู่เหมือนเดิม)
- แก้ `HomeDataAvaliable.svelte` — เปลี่ยนปุ่ม + ลอยมุมขวาล่าง (ปุ่มเพิ่ม data) จากวงกลม+SVG ที่วาดเอง มาใช้รูป `addbuttondata.png` เดียวกันกับปุ่มใน empty state ให้เป็นภาพเดียวกันทั้งคู่
- ผู้ใช้อนุญาตให้แตะ `app.css` และขอให้สร้าง class ไว้ใช้ซ้ำ — เพิ่ม `--font-heading: 'Iosevka Charon', monospace;` เข้าไปใน `@theme` block ของ `app.css` (Tailwind v4 auto-generate utility class `font-heading` ให้จากตัวแปรนี้ เหมือนกับ `--font-main` ที่มีอยู่แล้ว) แล้วแทนที่ `font-['Iosevka_Charon']` (arbitrary syntax) ทุกจุดใน `HomeDataAvaliable.svelte` (heading, empty state text) และ `DataCard.svelte` (title, created, edited) ด้วย `font-heading` แทน — เลือกทำแค่ส่วนฟอนต์ ไม่รวมค่าขนาด/สี/เงาอื่นๆ เพราะยังถูกปรับบ่อยอยู่
- ผู้ใช้อยากได้ชื่อ class ที่บ่งชัดว่าใช้เฉพาะส่วนของเรา ไม่ใช่ชื่อกลางๆ — เปลี่ยนชื่อตัวแปรจาก `--font-heading` เป็น `--font-masked-data` ใน `app.css` และแก้ทุกจุดที่เรียกใช้ใน `HomeDataAvaliable.svelte`/`DataCard.svelte` จาก class `font-heading` เป็น `font-masked-data` ให้ตรงกัน
- ช่วยผู้ใช้ตรวจ git branch/PR: ยืนยันว่า `ToCApp` เป็น git repo จริง อยู่บน branch `feat/HomeDataComponent` push ขึ้น origin แล้ว, base branch ที่ถูกต้องสำหรับ PR คือ `develop` (ดูจาก merge-base ตรงกับจุดที่ branch นี้แยกออกมา), ช่วยร่าง PR title/description ให้
- พบบั๊ก: `src/routes/+page.svelte` import `'$components/PersonalInfo.svelte'` (ตัว P ใหญ่) แต่ไฟล์จริงชื่อ `personalInfo.svelte` (ตัว p เล็ก) — รันได้บน Windows เพราะ filesystem ไม่สนตัวพิมพ์ แต่จะ build fail บน Linux (deploy จริง) รายงานให้ผู้ใช้ทราบ ยังไม่ได้แก้ตอนนั้น
- ผู้ใช้ระบุว่า `/create-data` ควรเป็นหน้าที่โชว์ `personalInfo.svelte` (ฟอร์มกรอกข้อมูล) ไม่ใช่หน้าเปล่า — สร้าง `src/routes/create-data/+page.svelte` ใหม่ (ของเดิมที่เคยสร้างไว้หายไปแล้วไม่ทราบสาเหตุ, ไฟล์ `datalog.md` นี้เองก็หายไปด้วยเหมือนกันตอนนี้ ต้องสร้างใหม่จากความจำในบทสนทนา) ให้มี `NavBar` + `personalInfo.svelte` (import ด้วยชื่อไฟล์ตัวพิมพ์ถูกต้อง แก้บั๊ก case-mismatch ไปในตัว) และย้าย `PersonalInfo` ออกจากหน้า `/` เดิม (`+page.svelte`) เพราะก่อนหน้านี้ถูกแปะไว้ผิดที่ (อยู่ปนกับ `HomeDataAvaliable` บนหน้าแรก)
