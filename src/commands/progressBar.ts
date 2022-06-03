import { MessageEmbed } from "discord.js";
import { error, getColor } from "../colors";
import { Command, CommandContext } from "../command";
import { delay } from "../util/misc";
import { random } from "../util/random";

export function progressBarCommand(progressMessage: (ctx: CommandContext) => string, finishedMessage: (ctx: CommandContext) => string, failedMessage: (ctx: CommandContext) => string): Command {
    return async (ctx) => {
        const embed = new MessageEmbed()
            .setTitle(progressMessage(ctx))
            .setColor(getColor())
            .setDescription("");

        let percentage = 0

        const msg = await ctx.message.reply({ embeds: [embed] });

        while (percentage < 100) {
            percentage += Math.floor(random.range(0, 10));
            if (percentage > 100) percentage = 100;

            embed.setDescription(`${percentage}%`);
            await msg.edit({ embeds: [embed] });

            await delay(random.range(500, 600));
        }

        const failed = random.chance(0.1);

        const resultEmbed = new MessageEmbed()
            .setTitle(!failed ? finishedMessage(ctx) : failedMessage(ctx))
            .setColor(!failed ? getColor() : error)
            .setDescription("");

        await ctx.message.reply({ embeds: [resultEmbed] });
    }
}