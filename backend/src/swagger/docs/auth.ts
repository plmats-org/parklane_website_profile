/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication and authorization endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate a user with email and password. Returns a JWT token for subsequent API calls. Only active users can log in.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful - Returns user data and JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                           enum: [super_admin, admin]
 *                         status:
 *                           type: string
 *                           enum: [active, inactive]
 *       400:
 *         description: Invalid input - Missing email or password
 *       401:
 *         description: Invalid credentials - Email or password is incorrect
 *       403:
 *         description: Account is inactive - User account has been deactivated
 *       429:
 *         description: Too many login attempts - Please try again later
 */

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current user profile
 *     description: Returns the authenticated user's profile information
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                           enum: [super_admin, admin]
 *                         phone:
 *                           type: string
 *                         status:
 *                           type: string
 *                           enum: [active, inactive]
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /auth/profile:
 *   patch:
 *     summary: Update user profile
 *     description: Update the authenticated user's profile information (first name, last name, phone). Cannot update email or role.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *                 description: User's first name
 *               last_name:
 *                 type: string
 *                 example: Doe
 *                 description: User's last name
 *               phone:
 *                 type: string
 *                 example: +250788123456
 *                 description: User's phone number in E.164 format
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         first_name:
 *                           type: string
 *                         last_name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phone:
 *                           type: string
 *                         role:
 *                           type: string
 *       400:
 *         description: Validation error - Invalid input data
 *       401:
 *         description: Unauthorized - Valid authentication token required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /auth/change-password:
 *   patch:
 *     summary: Change user password
 *     description: Change the authenticated user's password. Requires current password for verification.
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: oldPassword123
 *                 description: User's current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 example: newSecurePassword456
 *                 description: New password (minimum 8 characters)
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Validation error - New password doesn't meet requirements
 *       401:
 *         description: Current password is incorrect
 *       429:
 *         description: Too many password change attempts
 */

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Send a password reset link to the user's email. Always returns success to prevent email enumeration.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset instructions sent (if email exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Si un compte avec cet email existe, vous recevrez un lien de réinitialisation
 *       400:
 *         description: Invalid email format
 *       429:
 *         description: Too many requests
 */

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     description: Reset user password using the token received via email
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - newPassword
 *             properties:
 *               token:
 *                 type: string
 *                 description: JWT token received via email
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 example: newSecurePassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Mot de passe réinitialisé avec succès
 *       400:
 *         description: Invalid or expired token
 *       429:
 *         description: Too many requests
 */

export {};
