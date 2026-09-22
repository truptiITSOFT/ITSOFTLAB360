import logging
from decimal import Decimal
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.utils import timezone

logger = logging.getLogger(__name__)

def send_invoice_email_notification(invoice, recipient_email=None, custom_notes=None):
    """
    Sends a beautifully formatted HTML invoice email to the client using Django's configured SMTP settings.
    Returns a dict with status and message.
    """
    recipient = recipient_email or invoice.customer_email
    if not recipient:
        return {
            "success": False,
            "error": "No recipient email address provided on invoice or request."
        }

    try:
        items = list(invoice.items.select_related("product").all())
    except Exception:
        items = []

    subtotal = invoice.subtotal or Decimal("0.00")
    tax_amount = invoice.tax_amount or Decimal("0.00")
    total_amount = invoice.total_amount or Decimal("0.00")
    balance_due = invoice.balance_due if invoice.balance_due is not None else total_amount
    invoice_num = invoice.invoice_number or f"INV-{invoice.id}"

    # Build items rows for HTML table
    items_rows_html = ""
    items_text_list = []
    if items:
        for idx, item in enumerate(items, 1):
            pname = item.product.name if item.product else "Service Item"
            desc = item.description or ""
            uprice = f"₹{item.unit_price:,.2f}" if item.unit_price else "₹0.00"
            tot = f"₹{item.total_amount:,.2f}" if item.total_amount else "₹0.00"
            items_rows_html += f"""
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; text-align: left; font-size: 14px; color: #1e293b;">
                    <strong>{idx}. {pname}</strong>
                    {f'<div style="font-size: 12px; color: #64748b; margin-top: 2px;">{desc}</div>' if desc else ''}
                </td>
                <td style="padding: 12px; text-align: right; font-size: 14px; color: #334155;">{uprice}</td>
                <td style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #0f172a;">{tot}</td>
            </tr>
            """
            items_text_list.append(f"{idx}. {pname} - Rate: {uprice}, Total: {tot}")
    else:
        items_rows_html = f"""
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; text-align: left; font-size: 14px; color: #1e293b;">
                <strong>Franchise License & Onboarding</strong>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">Commercial franchise setup & software entitlement</div>
            </td>
            <td style="padding: 12px; text-align: right; font-size: 14px; color: #334155;">₹{subtotal:,.2f}</td>
            <td style="padding: 12px; text-align: right; font-size: 14px; font-weight: 600; color: #0f172a;">₹{subtotal:,.2f}</td>
        </tr>
        """
        items_text_list.append(f"Franchise License & Onboarding - Total: ₹{subtotal:,.2f}")

    # GST breakdown lines
    gst_html = ""
    if invoice.cgst_amount and invoice.cgst_amount > 0:
        gst_html += f"""
        <tr>
            <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">CGST:</td>
            <td style="padding: 6px 12px; text-align: right; color: #334155; font-size: 13px; font-weight: 600;">₹{invoice.cgst_amount:,.2f}</td>
        </tr>
        """
    if invoice.sgst_amount and invoice.sgst_amount > 0:
        gst_html += f"""
        <tr>
            <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">SGST:</td>
            <td style="padding: 6px 12px; text-align: right; color: #334155; font-size: 13px; font-weight: 600;">₹{invoice.sgst_amount:,.2f}</td>
        </tr>
        """
    if invoice.igst_amount and invoice.igst_amount > 0:
        gst_html += f"""
        <tr>
            <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">IGST (18%):</td>
            <td style="padding: 6px 12px; text-align: right; color: #334155; font-size: 13px; font-weight: 600;">₹{invoice.igst_amount:,.2f}</td>
        </tr>
        """
    if not gst_html and tax_amount > 0:
        gst_html = f"""
        <tr>
            <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">GST / Tax:</td>
            <td style="padding: 6px 12px; text-align: right; color: #334155; font-size: 13px; font-weight: 600;">₹{tax_amount:,.2f}</td>
        </tr>
        """

    notes_section = ""
    notes_text = custom_notes or invoice.notes
    if notes_text:
        notes_section = f"""
        <div style="background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 12px 16px; margin: 20px 0; border-radius: 4px;">
            <div style="font-size: 12px; font-weight: bold; color: #475569; text-transform: uppercase;">Payment Terms & Notes:</div>
            <div style="font-size: 13px; color: #334155; margin-top: 4px;">{notes_text}</div>
        </div>
        """

    subject = f"Invoice {invoice_num} from ITSOFTLAB360 - {invoice.customer_name}"

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice {invoice_num}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b;">
        <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1); border: 1px solid #e2e8f0;">
            <!-- Top Branding Banner -->
            <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 36px; color: #ffffff;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td align="left" valign="top">
                            <div style="display: inline-block; background-color: #3b82f6; color: #ffffff; font-weight: 900; font-size: 16px; padding: 6px 12px; border-radius: 8px; letter-spacing: 1px;">
                                ITSOFTLAB360
                            </div>
                            <div style="font-size: 11px; color: #94a3b8; margin-top: 6px; text-transform: uppercase; letter-spacing: 0.5px;">
                                Enterprise Cloud Solutions & Franchise Network
                            </div>
                        </td>
                        <td align="right" valign="top">
                            <div style="font-size: 24px; font-weight: 800; color: #38bdf8; letter-spacing: -0.5px;">INVOICE</div>
                            <div style="font-size: 14px; font-weight: 600; color: #e2e8f0; margin-top: 4px;">#{invoice_num}</div>
                            <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">Date: {invoice.invoice_date or timezone.now().date()}</div>
                            {f'<div style="font-size: 12px; color: #f87171; margin-top: 2px;">Due Date: {invoice.due_date}</div>' if invoice.due_date else ''}
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Customer & Billing Details -->
            <div style="padding: 24px 36px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td width="55%" align="left" valign="top">
                            <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Billed To:</div>
                            <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-top: 4px;">{invoice.customer_name}</div>
                            <div style="font-size: 13px; color: #475569; margin-top: 2px;">Email: {recipient}</div>
                            {f'<div style="font-size: 13px; color: #475569;">Phone: {invoice.customer_phone}</div>' if invoice.customer_phone else ''}
                            {f'<div style="font-size: 13px; color: #475569;">GSTIN: {invoice.customer_gstin}</div>' if invoice.customer_gstin else ''}
                            {f'<div style="font-size: 13px; color: #475569; margin-top: 4px;">{invoice.billing_address}</div>' if invoice.billing_address else ''}
                        </td>
                        <td width="45%" align="right" valign="top">
                            <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; display: inline-block; text-align: right; min-width: 180px;">
                                <div style="font-size: 11px; font-weight: 700; color: #047857; text-transform: uppercase;">Amount Due</div>
                                <div style="font-size: 24px; font-weight: 900; color: #065f46; margin-top: 4px;">₹{balance_due:,.2f}</div>
                                <div style="font-size: 11px; font-weight: 600; color: #059669; margin-top: 2px; text-transform: uppercase;">Status: {invoice.status.upper()}</div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Itemized Table -->
            <div style="padding: 24px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid #cbd5e1; background-color: #f8fafc;">
                            <th style="padding: 10px 12px; text-align: left; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Product / Description</th>
                            <th style="padding: 10px 12px; text-align: right; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Rate (₹)</th>
                            <th style="padding: 10px 12px; text-align: right; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase;">Amount (₹)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items_rows_html}
                    </tbody>
                </table>

                <!-- Summary Breakdown -->
                <div style="margin-top: 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td width="55%" align="left" valign="top">
                                {notes_section}
                            </td>
                            <td width="45%" align="right" valign="top">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 260px;">
                                    <tr>
                                        <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">Subtotal:</td>
                                        <td style="padding: 6px 12px; text-align: right; color: #334155; font-size: 13px; font-weight: 600;">₹{subtotal:,.2f}</td>
                                    </tr>
                                    {f'<tr><td style="padding: 6px 12px; text-align: right; color: #16a34a; font-size: 13px;">Discount:</td><td style="padding: 6px 12px; text-align: right; color: #16a34a; font-size: 13px; font-weight: 600;">-₹{invoice.discount_amount:,.2f}</td></tr>' if invoice.discount_amount and invoice.discount_amount > 0 else ''}
                                    {gst_html}
                                    <tr style="border-top: 2px solid #e2e8f0; border-bottom: 2px solid #e2e8f0;">
                                        <td style="padding: 10px 12px; text-align: right; color: #0f172a; font-size: 15px; font-weight: 800;">Total:</td>
                                        <td style="padding: 10px 12px; text-align: right; color: #0f172a; font-size: 16px; font-weight: 900;">₹{total_amount:,.2f}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 6px 12px; text-align: right; color: #64748b; font-size: 13px;">Amount Paid:</td>
                                        <td style="padding: 6px 12px; text-align: right; color: #059669; font-size: 13px; font-weight: 600;">₹{(invoice.amount_paid or Decimal("0.00")):,.2f}</td>
                                    </tr>
                                    <tr style="background-color: #f8fafc;">
                                        <td style="padding: 8px 12px; text-align: right; color: #dc2626; font-size: 14px; font-weight: 700;">Balance Due:</td>
                                        <td style="padding: 8px 12px; text-align: right; color: #dc2626; font-size: 14px; font-weight: 800;">₹{balance_due:,.2f}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Footer Support -->
            <div style="padding: 24px 36px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">
                <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                    Thank you for choosing <strong>ITSOFTLAB360</strong>.<br>
                    For billing questions, please reply directly to this email or contact accounts at 
                    <a href="mailto:official.hrmsm@gmail.com" style="color: #2563eb; text-decoration: none;">official.hrmsm@gmail.com</a>.
                </p>
                <div style="margin-top: 12px; font-size: 11px; color: #94a3b8;">
                    © {timezone.now().year} ITSOFTLAB360. All rights reserved.
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    plain_text = f"""
ITSOFTLAB360 - INVOICE #{invoice_num}
==================================================
Date: {invoice.invoice_date or timezone.now().date()}
Customer: {invoice.customer_name} ({recipient})
Total Amount: INR {total_amount:,.2f}
Balance Due: INR {balance_due:,.2f}
Status: {invoice.status.upper()}

ITEMS:
{chr(10).join(items_text_list)}

Subtotal: INR {subtotal:,.2f}
Tax / GST: INR {tax_amount:,.2f}
TOTAL: INR {total_amount:,.2f}
Balance Due: INR {balance_due:,.2f}

Notes:
{notes_text or 'Payment terms: Due on receipt.'}

Thank you for your business.
ITSOFTLAB360 Accounts Team
    """.strip()

    from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None) or getattr(settings, "EMAIL_HOST_USER", "official.hrmsm@gmail.com")

    try:
        msg = EmailMultiAlternatives(
            subject=subject,
            body=plain_text,
            from_email=from_email,
            to=[recipient],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send(fail_silently=False)

        # Update invoice status if draft
        if hasattr(invoice, "status") and invoice.status == "draft":
            invoice.status = "sent"
            invoice.save(update_fields=["status", "updated_at"])

        return {
            "success": True,
            "message": f"Invoice email sent successfully to {recipient}.",
            "recipient": recipient,
            "invoice_number": invoice_num
        }
    except Exception as exc:
        logger.error(f"Failed to dispatch invoice email to {recipient}: {exc}", exc_info=True)
        return {
            "success": False,
            "error": f"Failed to send email: {str(exc)}",
            "recipient": recipient
        }
