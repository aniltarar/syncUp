import { z } from "zod";

export const loginScheme = z.object({
  email: z.string().email("Lütfen geçerli bir e-mail adresi giriniz."),
  password: z
    .string()
    .min(6, "En az 6 karakter olmalı")
    .max(20, "En fazla 20 karakter olmalı"),
});

export const registerScheme = z.object({
  displayName: z.string().min(3, "En az 3 karakter olmalı"),
  email: z.string().email("Lütfen geçerli bir e-mail adresi giriniz."),
  password: z
    .string()
    .min(6, "En az 6 karakter olmalı")
    .max(20, "En fazla 20 karakter olmalı"),
  rePassword: z
    .string()
    .min(6, "En az 6 karakter olmalı")
    .max(20, "En fazla 20 karakter olmalı"),
});
