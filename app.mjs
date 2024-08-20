import { Bot, GrammyError, HttpError, InlineKeyboard } from "grammy";
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();
const prisma = new PrismaClient();

const bot = new Bot(process.env.TOKEN);

// Хранилища для пользователей и заблокированных пользователей
let usersBuffer = [];
let blockedUsersBuffer = [];

// Порог для массовой вставки в базу данных
const BATCH_SIZE = 300;

const texts = {
    MAIN_POST: `*Этот бот – полная замена официального сайта 1win в России и странах СНГ\\.*\n\nМы вывели казино на новый уровень: \nтеперь можно играть в любимые слоты прямо в Telegram 🎰\n\n||Нажимайте на кнопку "Регистрация" и получите бонус \\+500% к депозиту и 30% кэшбэк на казино 💸||`,
    WHAT_CAN_DO: `*Что умеет этот бот\\?*\n\n1️⃣\\. Полная замена официального сайта 1win\\.\n2️⃣\\. Удобная регистрация и вход через Telegram\\.\n3️⃣\\. Играйте в любимые слоты прямо в мессенджере\\! 🎰\n`
};

const keyboards = {
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

const images = {
    MAIN_IMAGE: "https://lh3.googleusercontent.com/fife/ALs6j_HuffTPMSOXwHDBaQd50tXlIFuuOjsfOLHiyvF9vp6j41oRihblZlbH_KgWgJYiXyFZlx4gZMB-1esuonlkWtabRct0mEDQxMwIjjQzvcC5ypsdEZBzc8wpO7ohwuXFvi5PwQvKy7z9RcIjBRAfzOee99qei3inCAibLL3R7pTSg-BV4O7RX8w-BtvPrEYxsBc5UT0_MuRx0oxzsRdOiPeyp8kAPH7uj5sUY5dxRuYidlmqZ-Mu5w_k38Y-J7pHmey6aAyNL7iHIlTlix2J25t3F1zxbtEDH241RebwQ4N0TK3rw8UXg-IIol6dC2YKsEkZzGY_KaWQbMtspjBKiokgh4RmWpzR0kdD4rNgweoI1f4fCof8ZRlg1V1Ol5cZFPFQBrF515Iff29ievDzYJCCYdxGvrWQS5k7MbkuSGA8sv7xawu2ZFslkSbNJua4iGT4keHP79kMgaDVndb5JCV5uw7n66DVd8oRaWoic48qewVGLhsGUDziNbptrVLUFYqmvIWuJRpy1FW01c7o8aAu-0_VWjJhaL5xzdvbpunDxsQyMVvtEkyY1LDnqesrelCITG5tB1sm1OReEia6UO0aCYjLhZ90HySRo_pRgPCegdPRYVfC_1y_a8z1NhzCGl3nxDWNs7nhRKMpcX8WCjDjaFw_mKujBW__mSxDzrVuzyOvU8iLgVgqkpTT2CnLKOGig0au_hMk9JKWiD3Cj6EjjIBgF288eReRBPcJycDQZXgvxwJnwtqJfPU96XESQGc_-RbTBTUDsHTYYHNwFEXoxAISwSSfULrQ7pegot4zKhB5uRkw5ZaIYN6_UqqQSTmHPqkM6FE8YFD9jDWZ35ycliJ3w0YWtTu_z83BVPOJtrtAUIwnLulIv7CFUL3KOFkTKsZmOiLDwH7Xcz2wtyGtJPKKGjwiMBcuD7vHcN0mtRuSDwoNmBfp7UrbNuV4q2yEhx_PBXsD48o9UY2z8L7t6aIoKj49kJhwdid9CNJJVq3uEh_cK_GLL4i1fpPoqFE1yYLH9ESxpsQiKyq-tyI4R87kFtvoldDkFBGOqQePOY11TkeDaz2oymwSgcHjRzX2OgBmRIPdQVt2RjEt1BI2-OsQTHqqX3wC7O-TodEfqr42IsuzfBsjwTg6A_ECYwYJJKYDg8sbw9sSHdVsQe8c3vYUR616FPpYlvuVd6xCFbU7uwbw6hJf2b6wT20POdmX8GgYp1dskC_RrCF_IFGRedQQbUcw6HxBpE3VLIj4teAp2cdBay3cI9kqwN_6LSKfgIWLql9CSgSAJss_ubHjUBd-aBbfyxoPqAoHZ8AMqkw7kfqINZxEHlpYXYbTVVfjrcjEH5O0MFrf3XWW_rvyuK5mnSONKGRywp4F14iqb8TnWrgezfN0-7I6L1XtvO74GsZaQBQNSevRwcPq_krOD5_PCDthO8mDaN3t8W4un3T2Bi2mXNbUK1xBtTDycyZQ6COMxIy6TnEVIR8zhMwTwV1hNk9hhDiLnTS_w4N2hxMKF1CuJNPkFqp4RqGiIGvz8u3dnGEbHfB09HkTCTRSJKK2-LnjEfGk1piUjN1nLtMX3mykaKVQC0RneAYlA_nP_-WKiI8Fel_ADrmcfFpPGGcUz72w3LzqhEyTjS4RDX2CiuJArFfWCPgJ5-heppkP_5UptN2L13SAxmRU2HMYSDI=w2760-h1508"
}

async function saveUsersToDatabase() {
    if (usersBuffer.length >= BATCH_SIZE) {
        try {
            await prisma.user.createMany({
                data: usersBuffer
            });
            console.log(`${usersBuffer.length} пользователей добавлены в базу данных.`);
            usersBuffer = [];  // Очистка массива после успешной вставки
        } catch (error) {
            console.error(`Ошибка при массовом добавлении пользователей: ${error.message}`, error);
        }
    }
}

async function blockUsersInDatabase() {
    if (blockedUsersBuffer.length >= BATCH_SIZE) {
        try {
            await prisma.blocked.createMany({
                data: blockedUsersBuffer
            });
            console.log(`${blockedUsersBuffer.length} пользователей заблокированы в базе данных.`);
            blockedUsersBuffer = [];  // Очистка массива после успешной вставки
        } catch (error) {
            console.error(`Ошибка при массовом блокировании пользователей: ${error.message}`, error);
        }
    }
}

bot.on('message', async (ctx) => {
    const TEXT = ctx.message.text;
    const LOCATION = ctx.from.language_code || "unknown";

    if (TEXT === "/start") {
        const user = {
            telegramId: String(ctx.from.id),
            language: LOCATION,
            nickname: ctx.from.username || ""
        };

        if (LOCATION === "ru") {
            usersBuffer.push(user);
            await saveUsersToDatabase();
            await ctx.react("👍");
            const answer = await ctx.replyWithPhoto(images.MAIN_IMAGE, {
                caption: texts.MAIN_POST,
                parse_mode: 'MarkdownV2',
                reply_markup: keyboards.MAIN_KEYBOARD
            });

            setTimeout(async () => {
                try {
                    await ctx.react("🔥", { message_id: answer.message_id });
                } catch (error) {
                    console.error(`Ошибка при добавлении реакции: ${error.message}`, error);
                }
            }, 2000);
        } else {
            blockedUsersBuffer.push(user);
            await blockUsersInDatabase();
        }
    }
});

bot.callbackQuery('what_can_do', async (ctx) => {
    try {
        await ctx.answerCallbackQuery();
        await ctx.replyWithPhoto(images.MAIN_IMAGE, {
            caption: texts.WHAT_CAN_DO,
            parse_mode: 'MarkdownV2',
            reply_markup: keyboards.BACK_KEYBOARD
        });
    } catch (error) {
        console.error(`Ошибка при обработке callbackQuery: ${error.message}`, error);
    }
});

bot.callbackQuery('back', async (ctx) => {
    try {
        await ctx.answerCallbackQuery();
        await ctx.replyWithPhoto(images.MAIN_IMAGE, {
            caption: texts.MAIN_POST,
            parse_mode: 'MarkdownV2',
            reply_markup: keyboards.MAIN_KEYBOARD
        });

        setTimeout(async () => {
            try {
                await ctx.editMessageReplyMarkup({});
            } catch (error) {
                console.error(`Ошибка при редактировании разметки сообщения: ${error.message}`, error);
            }
        }, 1000);

    } catch (error) {
        console.error(`Ошибка при обработке callbackQuery: ${error.message}`, error);
    }
});

bot.start().catch((err) => {
    console.error(`Ошибка при выполнении бота: ${err.message}`, err);
});

// Интерактивное сохранение данных в базу каждые 30 минут
let isSaving = false;

setInterval(async () => {
    if (!isSaving) {
        isSaving = true;
        try {
            await saveUsersToDatabase();
            await blockUsersInDatabase();
        } catch (error) {
            console.error(`Ошибка при сохранении данных: ${error.message}`, error);
        } finally {
            isSaving = false;
        }
    }
}, 1800000); // 1800000 миллисекунд = 30 минут

// Обработка завершения работы
process.on('SIGINT', async () => {
    console.log("Завершение работы...");
    try {
        await saveUsersToDatabase();
        await blockUsersInDatabase();
    } catch (error) {
        console.error(`Ошибка при завершении работы: ${error.message}`, error);
    } finally {
        process.exit(0);
    }
});

process.on('SIGTERM', async () => {
    console.log("Завершение работы...");
    try {
        await saveUsersToDatabase();
        await blockUsersInDatabase();
    } catch (error) {
        console.error(`Ошибка при завершении работы: ${error.message}`, error);
    } finally {
        process.exit(0);
    }
});
