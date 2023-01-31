import AdminLayout from "../../../../layouts/AdminLayout";
import React from "react";
import AdminContentMarketingForm from "../../../../components/Admin/ContentMarketing/Form";

const AdminContentMarketingAddPage = () => {
    return (
        <AdminLayout title={'Lisa uus'}>
            <AdminContentMarketingForm item={undefined} />
        </AdminLayout>
    )
}

export default AdminContentMarketingAddPage
