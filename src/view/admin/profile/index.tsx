import DashboardTitle from "../../../Components/reuseable/dashboard-title/index.js";
import ViewProfile from "../../common/profile/index.js";

export default function Profile() {
    const demoUserData = {
        _id: "65f1a2b3c4d5e6f7a8b9c0d1",
        fullName: "Sushil Hemrom",
        email: "sushil@gmail.com",
        role: "supplier",
        profileUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&h=256&fit=crop",
        status: "active",
        createdAt: "2026-01-15T08:30:00.000Z",
        updatedAt: "2026-07-07T12:00:00.000Z"
    };
    return (
        <div>
            <DashboardTitle
                title="My Profile"
                subtitle="View and manage your account details and business role"
            />
            <ViewProfile userData={demoUserData} />
        </div>
    )
}