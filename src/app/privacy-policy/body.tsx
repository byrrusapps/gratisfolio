import { Box, Typography, Link } from "@mui/material";

export default function Body() {
  return (
    <Box sx={{ color: { xs: "custom.grey", md: "myPaper.grey" }, p: 3 }}>
      <Typography
        variant="h4"
        sx={{
          color: { xs: "custom.main", md: "myPaper.main" },
          fontWeight: 600,
          mb: 2,
        }}
      >
        Privacy Policy
      </Typography>

      <Typography sx={{ mb: 2 }}>
        <strong>Last updated:</strong> 27/10/2025 
        {/* {new Date().toLocaleDateString()} */}
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Welcome to <strong>Gratisfolio</strong>, a free and privacy-friendly CV
        builder developed by <strong>Byrrus Apps Ltd</strong>. We value your
        privacy and are committed to protecting your personal information. This
        Privacy Policy explains what data we collect, how we use it, and your
        rights regarding that data.
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        1. Information We Collect
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Gratisfolio only collects the minimum data necessary to provide and
        improve the app experience:
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>Account Information:</strong> When you sign in (via Google),
            we collect your name, email address, and profile picture solely for
            authentication and personalization.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Saved Profiles:</strong> CV data you create, save, or load
            (such as experience, education, and skills) is securely stored in
            Firebase Firestore and tied to your account.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Usage Data:</strong> Anonymous technical data (e.g., browser
            type, screen size, error logs) may be collected to improve app
            stability and performance.
          </Typography>
        </li>
      </ul>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        2. How We Use Your Information
      </Typography>
      <ul>
        <li>
          <Typography>To authenticate users and manage sessions</Typography>
        </li>
        <li>
          <Typography>To save and load CV data for your convenience</Typography>
        </li>
        <li>
          <Typography>
            To provide support and respond to user inquiries
          </Typography>
        </li>
        <li>
          <Typography>To analyze app performance and fix issues</Typography>
        </li>
      </ul>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        3. Data Storage and Security
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Gratisfolio uses <strong>Firebase Authentication</strong> and{" "}
        <strong>Firebase Firestore</strong> on the Blaze plan. All data is
        transmitted securely over HTTPS. Access to user data is strictly
        restricted to the authenticated user, and all sensitive operations are
        server-side guarded.
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        4. Data Sharing
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Gratisfolio does <strong>not sell, share, or trade</strong> your
        personal data with third parties. We may use trusted infrastructure
        services (Firebase, Google Cloud) strictly to enable app functionality.
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        5. Your Rights
      </Typography>
      <Typography sx={{ mb: 2 }}>
        You can access, edit, or delete your data at any time:
      </Typography>
      <ul>
        <li>
          <Typography>
            <strong>View / Edit:</strong> Through the app’s profile management
            section.
          </Typography>
        </li>
        <li>
          <Typography>
            <strong>Delete Account:</strong> Use the “Delete Account” option in
            settings to permanently remove your data from our servers.
          </Typography>
        </li>
      </ul>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        6. Cookies & Local Storage
      </Typography>
      <Typography sx={{ mb: 2 }}>
        Gratisfolio uses local storage to remember your preferences (e.g.,
        theme, layout) and maintain session continuity. No third-party tracking
        or advertising cookies are used.
      </Typography>

      <Typography
        variant="h6"
        sx={{ color: { xs: "custom.main", md: "myPaper.main" }, mt: 3 }}
      >
        7. Contact Us
      </Typography>
      <Typography sx={{ mb: 2 }}>
        If you have any questions or privacy concerns, you can contact the
        developer at{" "}
        <Link
          href="mailto:byrrusapps@gmail.com"
          sx={{ color: { xs: "custom.main", md: "myPaper.main" } }}
        >
          byrrusapps@gmail.com
        </Link>
        .
      </Typography>

      {/* <Typography sx={{ mt: 3, fontSize: "0.9rem", opacity: 0.8 }}>
        Built with React, Next.js, TypeScript, and MUI. Hosted securely on
        Firebase.
      </Typography> */}
    </Box>
  );
}
