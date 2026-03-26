/**
 * Utility functions for data validation and formatting
 */

/**
 * Validates Pakistan CNIC format: XXXXX-XXXXXXX-X
 */
export const validateCNIC = (cnic: string): boolean => {
  const regex = /^\d{5}-\d{7}-\d{1}$/;
  return regex.test(cnic);
};

/**
 * Validates Phone number with international code: +92XXXXXXXXXX
 */
export const validatePhone = (phone: string): boolean => {
  const regex = /^\+92\d{10}$/;
  return regex.test(phone);
};

/**
 * Formats a phone number to international standard if it's a local Pakistan number
 */
export const formatPhone = (phone: string): string => {
  let cleaned = phone.replace(/\D/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '92' + cleaned.substring(1);
  }
  if (!cleaned.startsWith('92')) {
    cleaned = '92' + cleaned;
  }
  return '+' + cleaned;
};

/**
 * Converts an array of objects to CSV string
 */
export const convertToCSV = (data: any[]): string => {
  if (data.length === 0) return "";
  
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => 
    headers.map(header => {
      const val = obj[header] || "";
      // Escape quotes and wrap in quotes if contains comma
      const stringVal = String(val).replace(/"/g, '""');
      return stringVal.includes(',') ? `"${stringVal}"` : stringVal;
    }).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
};

/**
 * Triggers a download of a CSV file
 */
export const downloadCSV = (data: any[], filename: string) => {
  const csv = convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

/**
 * Formats data specifically for Google Contacts import
 * Required headers: Name, Given Name, Family Name, Group Membership, E-mail 1 - Value, Phone 1 - Value, Organization 1 - Name, Organization 1 - Title
 */
export const exportToGoogleContacts = (staff: any[]) => {
  const googleContactsData = staff.map(s => ({
    "Name": s.name,
    "Given Name": s.name.split(' ')[0],
    "Family Name": s.name.split(' ').slice(1).join(' '),
    "Group Membership": "NursingCare.pk Staff",
    "E-mail 1 - Value": s.email || "",
    "Phone 1 - Value": formatPhone(s.contact || ""),
    "Organization 1 - Name": "NursingCare.pk",
    "Organization 1 - Title": s.designation,
    "Address 1 - Formatted": `${s.address || ""}, ${s.area || ""}, ${s.district || ""}`,
    "Notes": `CNIC: ${s.cnic || ""}, ID: ${s.id}`
  }));
  
  downloadCSV(googleContactsData, `nursingcare_pk_contacts_${new Date().toISOString().split('T')[0]}.csv`);
};
