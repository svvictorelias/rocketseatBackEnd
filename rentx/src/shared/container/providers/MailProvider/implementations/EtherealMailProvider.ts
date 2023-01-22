import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import fs from "fs";
import handlebars from "handlebars";
@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        });
        this.client = transporter;
      })
      .catch(e => console.log(e));
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContext = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContext);

    const templateHTML = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br>",
      subject,
      html: templateHTML
    });
    console.log("message sent:", message.messageId);
    console.log("Prewv url:", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
