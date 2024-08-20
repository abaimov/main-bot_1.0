import {Bot, GrammyError, HttpError} from "grammy";
import {images, keyboards, texts} from "./componetns.mjs";
import {PrismaClient} from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();
const prisma = new PrismaClient()

const bot = new Bot(process.env.TOKEN);

bot.on('message', async (ctx) => {
    const TEXT = ctx.message.text;
    const LOCATION = ctx.from.language_code;
    if (TEXT === "/start" && LOCATION === 'ru') {
        try {
            await ctx.react("👍");
            const answer = await ctx.replyWithPhoto(images.MAIN_IMAGE, {
                caption: texts.MAIN_POST,
                parse_mode: 'MarkdownV2',
                reply_markup: keyboards.MAIN_KEYBOARD
            });

            setTimeout(async () => {
                try {
                    await ctx.react("🔥", {message_id: answer.message_id});
                } catch (error) {
                    console.error(`Ошибка при добавлении реакции: ${error.message}`, error);
                }
            }, 2000);

            try {
                await prisma.user.create({
                    data: {
                        telegramId: String(ctx.from.id),
                        language: ctx.from.language_code,
                        nickname: ctx.from.username
                    }
                });
            } catch (e) {
                console.log(`Не удалось создать пользователя ID: ${ctx.from.id}, LANG: ${ctx.from.language_code}`);
            }
        } catch (error) {
            console.error(`Ошибка при обработке команды /start: ${error.message}`, error);
            if (error instanceof GrammyError) {
                console.error(`Ошибка Grammy: ${error.message}`, error);
            } else if (error instanceof HttpError) {
                console.error(`Ошибка HTTP: ${error.message}`, error);
            } else {
                console.error(`Неизвестная ошибка: ${error.message}`, error);
            }
        }
    } else {
        try {
            await prisma.blocked.create({
                data: {
                    telegramId: ctx.from.id.toString(),
                    language: ctx.from.language_code,
                    nickname: ctx.from.username
                }
            });
        } catch (e) {
            console.log(`Не удалось заблокировать пользователя ID: ${ctx.from.id}, LANG: ${ctx.from.language_code}`);
        }
        return null;
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
        if (error instanceof GrammyError) {
            console.error(`Ошибка Grammy: ${error.message}`, error);
        } else if (error instanceof HttpError) {
            console.error(`Ошибка HTTP: ${error.message}`, error);
        } else {
            console.error(`Неизвестная ошибка: ${error.message}`, error);
        }
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
                await ctx.editMessageReplyMarkup({}); // Передаем пустой объект, чтобы удалить кнопки
            } catch (error) {
                console.error(`Ошибка при редактировании разметки сообщения: ${error.message}`, error);
            }
        }, 1000);

    } catch (error) {
        console.error(`Ошибка при обработке callbackQuery: ${error.message}`, error);
        if (error instanceof GrammyError) {
            console.error(`Ошибка Grammy: ${error.message}`, error);
        } else if (error instanceof HttpError) {
            console.error(`Ошибка HTTP: ${error.message}`, error);
        } else {
            console.error(`Неизвестная ошибка: ${error.message}`, error);
        }
    }
});

bot.start().catch((err) => {
    console.error(`Ошибка при выполнении бота: ${err.message}`, err);
});