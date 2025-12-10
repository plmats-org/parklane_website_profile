/**
 * @swagger
 * /vendors:
 *   post:
 *     summary: Create a new vendor registration
 *     description: Submit a new vendor registration with comprehensive company information and documents
 *     tags:
 *       - Vendors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_information
 *               - company_profile
 *             properties:
 *               company_information:
 *                 type: object
 *                 required:
 *                   - registered_company_name
 *                   - country_of_registration
 *                   - year_established
 *                   - company_registration_number
 *                   - registered_business_address
 *                   - corporate_email
 *                   - primary_contact_person_name
 *                   - contact_person_title
 *                   - phone_numbers
 *                 properties:
 *                   registered_company_name:
 *                     type: string
 *                     example: "ABC Trading Limited"
 *                   trading_name:
 *                     type: string
 *                     example: "ABC Traders"
 *                   country_of_registration:
 *                     type: string
 *                     example: "Kenya"
 *                   year_established:
 *                     type: number
 *                     example: 2010
 *                   company_registration_number:
 *                     type: string
 *                     example: "COMP-2010-001234"
 *                   registered_business_address:
 *                     type: string
 *                     example: "123 Business Street, Nairobi"
 *                   operational_address:
 *                     type: string
 *                   website:
 *                     type: string
 *                   corporate_email:
 *                     type: string
 *                     example: "info@abctraders.com"
 *                   primary_contact_person_name:
 *                     type: string
 *                     example: "John Doe"
 *                   contact_person_title:
 *                     type: string
 *                     example: "General Manager"
 *                   phone_numbers:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["+254123456789"]
 *               company_profile:
 *                 type: object
 *                 required:
 *                   - company_overview
 *                   - core_activities
 *                   - industries_served
 *                   - products_services_offered
 *                   - business_type
 *                   - countries_regions_supplied
 *                   - production_service_capacity
 *                   - minimum_order_quantities
 *                   - lead_times
 *                   - customization_capability
 *                 properties:
 *                   company_overview:
 *                     type: string
 *                     example: "We are a leading distributor of industrial materials..."
 *                   core_activities:
 *                     type: string
 *                     example: "Manufacturing and distribution of construction materials"
 *                   industries_served:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Construction & Infrastructure", "Manufacturing & Industrial"]
 *                   products_services_offered:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Steel bars", "Cement", "Concrete blocks"]
 *                   business_type:
 *                     type: string
 *                     enum: [manufacturer, distributor, agent, hybrid]
 *                     example: "manufacturer"
 *                   countries_regions_supplied:
 *                     type: array
 *                     items:
 *                       type: string
 *                     example: ["Kenya", "Rwanda", "Uganda"]
 *                   production_service_capacity:
 *                     type: string
 *                     example: "1000 tons per month"
 *                   minimum_order_quantities:
 *                     type: string
 *                     example: "10 tons"
 *                   lead_times:
 *                     type: string
 *                     example: "2-4 weeks"
 *                   customization_capability:
 *                     type: string
 *                     enum: [yes, no, limited]
 *                     example: "yes"
 *                   customization_details:
 *                     type: string
 *               certifications:
 *                 type: object
 *                 properties:
 *                   iso_certifications:
 *                     type: array
 *                     items:
 *                       type: string
 *                   industry_specific_certifications:
 *                     type: array
 *                     items:
 *                       type: string
 *                   quality_control_systems:
 *                     type: string
 *                   certification_documents:
 *                     type: array
 *                     items:
 *                       type: object
 *               product_technical:
 *                 type: object
 *                 properties:
 *                   product_catalog:
 *                     type: array
 *                     items:
 *                       type: object
 *                   hs_codes:
 *                     type: array
 *                     items:
 *                       type: string
 *                   warranty_terms:
 *                     type: string
 *               commercial_financial:
 *                 type: object
 *                 properties:
 *                   pricing_structure:
 *                     type: string
 *                   payment_terms:
 *                     type: array
 *                     items:
 *                       type: string
 *                   bank_name:
 *                     type: string
 *                   bank_account_number:
 *                     type: string
 *                   bank_account_name:
 *                     type: string
 *               logistics:
 *                 type: object
 *                 properties:
 *                   country_of_origin:
 *                     type: array
 *                     items:
 *                       type: string
 *                   shipping_methods:
 *                     type: array
 *                     items:
 *                       type: string
 *               legal_risk:
 *                 type: object
 *                 properties:
 *                   anti_bribery_compliance:
 *                     type: string
 *                     enum: [yes, no]
 *                   nda_acceptance:
 *                     type: boolean
 *               sustainability:
 *                 type: object
 *                 properties:
 *                   environmental_policies:
 *                     type: string
 *                     enum: [yes, no]
 *                   waste_management:
 *                     type: string
 *               references:
 *                 type: object
 *                 properties:
 *                   major_clients_list:
 *                     type: array
 *                     items:
 *                       type: object
 *               additional:
 *                 type: object
 *                 properties:
 *                   exclusive_partnerships_interest:
 *                     type: string
 *                     enum: [yes, no]
 *                   additional_comments:
 *                     type: string
 *     responses:
 *       201:
 *         description: Vendor registration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Validation error or vendor already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   get:
 *     summary: Get all vendors with filtering and pagination
 *     description: Retrieve a paginated list of vendors with optional filtering by status, business type, country, and search query
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *           default: 1
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *           default: 10
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, on_hold, suspended]
 *       - name: business_type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [manufacturer, distributor, agent, hybrid]
 *       - name: country
 *         in: query
 *         schema:
 *           type: string
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *           description: Search by company name, email, or overview
 *       - name: sort
 *         in: query
 *         schema:
 *           type: string
 *           default: "-submitted_at"
 *           description: Sort field and direction (e.g., "-submitted_at", "status")
 *     responses:
 *       200:
 *         description: List of vendors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Vendor'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: number
 *                         limit:
 *                           type: number
 *                         total:
 *                           type: number
 *                         totalPages:
 *                           type: number
 *       401:
 *         description: Unauthorized
 *
 * /vendors/{id}:
 *   get:
 *     summary: Get vendor by ID
 *     tags:
 *       - Vendors
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 *
 *   delete:
 *     summary: Soft delete vendor
 *     description: Soft delete a vendor (super_admin only). Sets is_deleted flag and deleted_at timestamp. Data is retained for audit purposes.
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor soft deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Vendor soft deleted successfully"
 *       404:
 *         description: Vendor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires super_admin role
 *
 * /vendors/{id}/status:
 *   patch:
 *     summary: Update vendor status
 *     description: Update vendor approval status (admin only). Rejection reason is required when status is "rejected"
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected, on_hold, suspended]
 *               rejection_reason:
 *                 type: string
 *                 description: Required when status is "rejected"
 *                 example: "Missing required certifications"
 *               notes:
 *                 type: string
 *                 example: "Please provide ISO 9001 certification"
 *     responses:
 *       200:
 *         description: Vendor status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Validation error
 *       404:
 *         description: Vendor not found
 *       401:
 *         description: Unauthorized
 *
 * /vendors/{id}/notes:
 *   patch:
 *     summary: Add admin note to vendor
 *     description: Add an internal admin note to a vendor record. Vendor data is read-only, but admins can track observations via notes.
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - note
 *             properties:
 *               note:
 *                 type: string
 *                 description: Admin note content
 *                 example: "Verified company registration documents"
 *     responses:
 *       200:
 *         description: Note added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Admin note added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendor:
 *                       $ref: '#/components/schemas/Vendor'
 *       400:
 *         description: Validation error - note is required
 *       404:
 *         description: Vendor not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - requires admin or super_admin role
 *
 * /vendors/search:
 *   get:
 *     summary: Search vendors
 *     description: Full-text search for vendors by company name, email, or description
 *     tags:
 *       - Vendors
 *     parameters:
 *       - name: query
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *           minLength: 2
 *         example: "ABC Trading"
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *           default: 10
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     vendors:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Vendor'
 *                     count:
 *                       type: number
 *
 * /vendors/email/{email}:
 *   get:
 *     summary: Get vendor by email
 *     tags:
 *       - Vendors
 *     parameters:
 *       - name: email
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vendor retrieved successfully
 *       404:
 *         description: Vendor not found
 *
 * /vendors/stats/overview:
 *   get:
 *     summary: Get vendor statistics
 *     description: Get overview statistics about vendors (admin only)
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Vendor statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     statistics:
 *                       type: object
 *                       properties:
 *                         totalCount:
 *                           type: array
 *                           items:
 *                             type: object
 *                         byStatus:
 *                           type: array
 *                           items:
 *                             type: object
 *                         byBusinessType:
 *                           type: array
 *                           items:
 *                             type: object
 *                         byCountry:
 *                           type: array
 *                           items:
 *                             type: object
 *                         recentSubmissions:
 *                           type: array
 *                           items:
 *                             type: object
 *
 * /vendors/export/data:
 *   get:
 *     summary: Export vendors data
 *     description: Export vendors to JSON or CSV format (admin only)
 *     tags:
 *       - Vendors
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: format
 *         in: query
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *           default: json
 *       - name: status
 *         in: query
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected, on_hold, suspended]
 *       - name: business_type
 *         in: query
 *         schema:
 *           type: string
 *           enum: [manufacturer, distributor, agent, hybrid]
 *       - name: country
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data exported successfully
 *       400:
 *         description: Invalid export format
 *
 * components:
 *   schemas:
 *     Vendor:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         company_information:
 *           type: object
 *         company_profile:
 *           type: object
 *         certifications:
 *           type: object
 *         product_technical:
 *           type: object
 *         commercial_financial:
 *           type: object
 *         logistics:
 *           type: object
 *         legal_risk:
 *           type: object
 *         sustainability:
 *           type: object
 *         references:
 *           type: object
 *         additional:
 *           type: object
 *         status:
 *           type: string
 *           enum: [pending, approved, rejected, on_hold, suspended]
 *         is_deleted:
 *           type: boolean
 *           default: false
 *         deleted_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         admin_notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               note:
 *                 type: string
 *               added_by:
 *                 type: string
 *               added_at:
 *                 type: string
 *                 format: date-time
 *         submitted_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         reviewed_by:
 *           type: string
 *         reviewed_at:
 *           type: string
 *           format: date-time
 *         rejection_reason:
 *           type: string
 *         notes:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */
