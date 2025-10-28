"use client";
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import { MyIcon } from "@/components";

const faqs = [
  {
    question: "What is Gratisfolio?",
    answer:
      "Gratisfolio is a free and easy-to-use CV builder by Byrrus Apps. It helps you design, customize, and download professional resumes — right from your phone or computer."
  },
  {
    question: "Do I need to sign in?",
    answer:
      "You can start building your CV without signing in. But if you want to save your work, you can sign in with Google to securely store and load your resumes anytime."
  },
  {
    question: "Is Gratisfolio really free?",
    answer:
      "Yes! Gratisfolio is completely free to use. There are no subscriptions, hidden charges, or watermarks on your CVs."
  },
  {
    question: "How do I download my CV?",
    answer:
      "Just click the ‘Download PDF’ button. Gratisfolio will generate a clean, printable version of your resume that’s ready to send to employers."
  },
  {
    question: "Is my information safe?",
    answer:
      "Yes. Your data is stored securely on Firebase and only linked to your account. We never sell or share your information with anyone."
  },
  {
    question: "Can I use Gratisfolio on my phone?",
    answer:
      "Definitely! Gratisfolio works great on mobile, tablet, and desktop. You can even install it as an app from your browser."
  },
  {
    question: "How do I delete my account?",
    answer:
      "Go to Settings and tap ‘Delete Account’. This will permanently remove your data from our servers."
  },
  // {
  //   question: "Who built Gratisfolio?",
  //   answer:
  //     "Gratisfolio was built by Byrrus Apps using React, Next.js, TypeScript, and Material-UI — hosted securely on Firebase."
  // },
  {
    question: "How can I contact support?",
    answer:
      "If you have questions or feedback, feel free to reach out at byrrusapps@gmail.com — we’d love to hear from you!"
  }
];

const FAQSection: React.FC = () => {
  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        px: 2,
        color: { xs: "custom.grey", md: "myPaper.grey" },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 600,
          textAlign: "center",
          color: { xs: "custom.main", md: "myPaper.main" },
        }}
      >
        Frequently Asked Questions
      </Typography>

      {faqs.map((item, i) => (
        <Accordion
          key={i}
          disableGutters
          sx={{
            mb: 1.5,
            background: "transparent",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px !important",
            boxShadow: "none",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary expandIcon={<MyIcon>expand_more</MyIcon>}>
            <Typography fontWeight={600}>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQSection;
