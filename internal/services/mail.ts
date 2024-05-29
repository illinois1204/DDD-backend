import { Transporter, createTransport } from "nodemailer";
import hbs, { NodemailerExpressHandlebarsOptions } from "nodemailer-express-handlebars";
import { Options } from "nodemailer/lib/mailer";

type TemplateEmailOptions = { template: string; context?: Record<string, string> };
class Transport {
    private transport: Transporter;
    constructor() {
        this.transport = createTransport({
            service: "Gmail",
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
            // auth: {
            //     type: "OAUTH2",
            //     user: process.env.MAIL_USER,
            //     clientId: process.env.MAIL_CLIENT,
            //     clientSecret: process.env.MAIL_SECRET,
            //     refreshToken: process.env.MAIL_TOKEN
            // }
        });
    }

    private hbsOptions: NodemailerExpressHandlebarsOptions = {
        extName: ".hbs",
        viewPath: `${process.cwd()}/external/views/mail`,
        viewEngine: { defaultLayout: undefined }
    };

    protected async send(to: string, subject: string, opt: TemplateEmailOptions) {
        this.transport.use("compile", hbs(this.hbsOptions));
        await this.transport.sendMail({ to, subject, ...opt });
    }

    protected async sendRaw(to: string, subject: string, opt: Options) {
        await this.transport.sendMail({ ...opt, to, subject });
    }
}

export abstract class Mailer extends Transport {
    async confirm(to: string, link: string) {
        await this.send(to, "Подтверждение почты", { template: "confirm", context: { link } });
    }

    async resetPassword(to: string, link: string) {
        await this.send(to, "Сброс пароля", { template: "reset-password", context: { link } });
    }
}

class Service extends Mailer {}
export const MailService = new Service();
