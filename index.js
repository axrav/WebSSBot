require("dotenv").config();
const { Bot } = require("grammy");
const { InputFile } = require('grammy');
const bot = new Bot(process.env.BOT_TOKEN);
const fs  = require('fs');
const {webss} = require("./utils");
const {inline} = require("./utils")
const keyboard = inline();
bot.command(['start','help'],
    async (ctx) =>
    { await ctx.reply(
        `Hey [${ctx.message.from.first_name}](tg://user?id=${ctx.message.from.id}), I am a simple Bot to capture web screenshots,To capture one send /webss and your link`, {parse_mode: "MarkdownV2",reply_markup: keyboard, reply_to_message_id: ctx.msg.message_id}
)})
bot.command('webss', 
    async (ctx) =>
    { const link = (ctx.message.text.split(/\s/))[1];
      const reg = "(^http:/\/\|https:/\/\)(.+)$";
      if (link === undefined || !link.match(reg) ){
        await ctx.reply('Please Provide a valid URL starting with http or https to capture screenshot', {reply_to_message_id: ctx.msg.message_id});
        return;
      }
      const userz = ctx.message.from.id;
     try{
        const screen = await webss(link, userz);
        await ctx.replyWithPhoto(new InputFile(screen), {caption: `Web Screenshot of ${link}`,reply_to_message_id: ctx.msg.message_id, disable_web_preview: true,});
        fs.unlinkSync(screen);
     }catch(err){
          console.error(err);
          await ctx.reply('Unable to Capture Screenshot,Try again later!', {reply_to_message_id: ctx.msg.message_id});
    }
})
bot.catch(console.error);
bot.start();
