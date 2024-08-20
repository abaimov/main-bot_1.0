import {InlineKeyboard} from "grammy";
export const texts = {
    MAIN_POST: `*Этот бот – полная замена официального сайта 1win в России и странах СНГ\\.*\n\nМы вывели казино на новый уровень: \nтеперь можно играть в любимые слоты прямо в Telegram 🎰\n\n||Нажимайте на кнопку "Регистрация" и получите бонус \\+500% к депозиту и 30% кэшбэк на казино 💸||`,
    WHAT_CAN_DO: `*Что умеет этот бот\\?*\n\n1️⃣\\. Полная замена официального сайта 1win\\.\n2️⃣\\. Удобная регистрация и вход через Telegram\\.\n3️⃣\\. Играйте в любимые слоты прямо в мессенджере\\! 🎰\n`
};
export const keyboards = {
    MAIN_KEYBOARD: new InlineKeyboard()
        .webApp("💎Регистрация", "https://1win-global-pro.com/officialbot")
        .row()
        .webApp("💵 Войти", "https://1win-global-pro.com/officialbot")
        .row()
        .text("🤖 Что умеет этот бот", "what_can_do")
        .row()
        .url("👑 Присоединиться к группе", "https://t.me/+oBTOK-9nhu5iODM6"),

    BACK_KEYBOARD: new InlineKeyboard().text("⬅️ НАЗАД", "back")
};
export const images = {
    MAIN_IMAGE: "https://lh3.googleusercontent.com/fife/ALs6j_HuffTPMSOXwHDBaQd50tXlIFuuOjsfOLHiyvF9vp6j41oRihblZlbH_KgWgJYiXyFZlx4gZMB-1esuonlkWtabRct0mEDQxMwIjjQzvcC5ypsdEZBzc8wpO7ohwuXFvi5PwQvKy7z9RcIjBRAfzOee99qei3inCAibLL3R7pTSg-BV4O7RX8w-BtvPrEYxsBc5UT0_MuRx0oxzsRdOiPeyp8kAPH7uj5sUY5dxRuYidlmqZ-Mu5w_k38Y-J7pHmey6aAyNL7iHIlTlix2J25t3F1zxbtEDH241RebwQ4N0TK3rw8UXg-IIol6dC2YKsEkZzGY_KaWQbMtspjBKiokgh4RmWpzR0kdD4rNgweoI1f4fCof8ZRlg1V1Ol5cZFPFQBrF515Iff29ievDzYJCCYdxGvrWQS5k7MbkuSGA8sv7xawu2ZFslkSbNJua4iGT4keHP79kMgaDVndb5JCV5uw7n66DVd8oRaWoic48qewVGLhsGUDziNbptrVLUFYqmvIWuJRpy1FW01c7o8aAu-0_VWjJhaL5xzdvbpunDxsQyMVvtEkyY1LDnqesrelCITG5tB1sm1OReEia6UO0aCYjLhZ90HySRo_pRgPCegdPRYVfC_1y_a8z1NhzCGl3nxDWNs7nhRKMpcX8WCjDjaFw_mKujBW__mSxDzrVuzyOvU8iLgVgqkpTT2CnLKOGig0au_hMk9JKWiD3Cj6EjjIBgF288eReRBPcJycDQZXgvxwJnwtqJfPU96XESQGc_-RbTBTUDsHTYYHNwFEXoxAISwSSfULrQ7pegot4zKhB5uRkw5ZaIYN6_UqqQSTmHPqkM6FE8YFD9jDWZ35ycliJ3w0YWtTu_z83BVPOJtrtAUIwnLulIv7CFUL3KOFkTKsZmOiLDwH7Xcz2wtyGtJPKKGjwiMBcuD7vHcN0mtRuSDwoNmBfp7UrbNuV4q2yEhx_PBXsD48o9UY2z8L7t6aIoKj49kJhwdid9CNJJVq3uEh_cK_GLL4i1fpPoqFE1yYLH9ESxpsQiKyq-tyI4R87kFtvoldDkFBGOqQePOY11TkeDaz2oymwSgcHjRzX2OgBmRIPdQVt2RjEt1BI2-OsQTHqqX3wC7O-TodEfqr42IsuzfBsjwTg6A_ECYwYJJKYDg8sbw9sSHdVsQe8c3vYUR616FPpYlvuVd6xCFbU7uwbw6hJf2b6wT20POdmX8GgYp1dskC_RrCF_IFGRedQQbUcw6HxBpE3VLIj4teAp2cdBay3cI9kqwN_6LSKfgIWLql9CSgSAJss_ubHjUBd-aBbfyxoPqAoHZ8AMqkw7kfqINZxEHlpYXYbTVVfjrcjEH5O0MFrf3XWW_rvyuK5mnSONKGRywp4F14iqb8TnWrgezfN0-7I6L1XtvO74GsZaQBQNSevRwcPq_krOD5_PCDthO8mDaN3t8W4un3T2Bi2mXNbUK1xBtTDycyZQ6COMxIy6TnEVIR8zhMwTwV1hNk9hhDiLnTS_w4N2hxMKF1CuJNPkFqp4RqGiIGvz8u3dnGEbHfB09HkTCTRSJKK2-LnjEfGk1piUjN1nLtMX3mykaKVQC0RneAYlA_nP_-WKiI8Fel_ADrmcfFpPGGcUz72w3LzqhEyTjS4RDX2CiuJArFfWCPgJ5-heppkP_5UptN2L13SAxmRU2HMYSDI=w2760-h1508"
}
export function getRandomString() {
    const strings = [
        "Мария выйграла 200$",
        "tai_li выйграл 200$",
        "ricardo87 выйграл 200$"
    ];
    const randomIndex = Math.floor(Math.random() * strings.length);
    return strings[randomIndex];
}