const z = require('zod');

const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min(6,{
        message: "Password most be at least 6 characters"
    })
});

const loginSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }).min({
        message: "Password most be at least 6 characters"
    })
});

module.exports = {
    reg: registerSchema,
    log: loginSchema
}