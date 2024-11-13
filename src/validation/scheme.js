import { z } from "zod";

export const loginScheme = z.object({
  email: z.string().email("Lütfen geçerli bir e-mail adresi giriniz."),
  password: z
    .string()
    .min(6, "En az 6 karakter olmalı")
    .max(20, "En fazla 20 karakter olmalı"),
});
