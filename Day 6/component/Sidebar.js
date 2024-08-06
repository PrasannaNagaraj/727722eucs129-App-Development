import { ChevronDown, ChevronUp, X } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/Sidebar.css';

const Sidebar = ({ open, onClose }) => {
    const [openDropdown, setOpenDropdown] = useState({
        requests: false,
        reports: false,
        projectManagement: false,
        calendar: false
    });

    const handleDropdownToggle = (section) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    return (
        <div className={`Sidebar ${open ? 'open' : ''}`}>
            <div className="SidebarHeader">
                <button className="SidebarCloseButton" onClick={onClose}><X /></button>
            </div>
            <div className="SidebarMenu">
                <div className="SidebarItem" onClick={() => handleDropdownToggle('requests')}>
                    Shift Management {openDropdown.requests ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openDropdown.requests && (
                    <div className="SidebarSubMenu">
                        <Link to="/Request" className="SidebarSubItem">Manage Requests</Link>
                        <Link to="/requests/manage" className="SidebarSubItem">Shift Swap</Link>
                    </div>
                )}
                <div className="SidebarItem" onClick={() => handleDropdownToggle('calendar')}>
                    Calendar {openDropdown.calendar ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openDropdown.calendar && (
                    <div className="SidebarSubMenu">
                        <Link to="/user-calendar" className="SidebarSubItem">Schedules</Link>
                        <Link to="/calendar/time-off" className="SidebarSubItem">Time off requests</Link>
                    </div>
                )}
                <div className="SidebarItem" onClick={() => handleDropdownToggle('reports')}>
                    Reports {openDropdown.reports ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openDropdown.reports && (
                    <div className="SidebarSubMenu">
                        <Link to="/reports/generate" className="SidebarSubItem">Generate Report</Link>
                        <Link to="/reports/view" className="SidebarSubItem">View Reports</Link>
                    </div>
                )}
                <div className="SidebarItem" onClick={() => handleDropdownToggle('projectManagement')}>
                    Project Management {openDropdown.projectManagement ? <ChevronUp /> : <ChevronDown />}
                </div>
                {openDropdown.projectManagement && (
                    <div className="SidebarSubMenu">
                        <Link to="/project-management/overview" className="SidebarSubItem">Overview</Link>
                        <Link to="/project-management/tasks" className="SidebarSubItem">Tasks</Link>
                    </div>
                )}
                <div className="SidebarItem">
                    <Link to="/profile">Profile</Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
