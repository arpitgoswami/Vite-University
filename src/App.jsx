import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/others/ComingSoon'
import Error404 from './pages/others/Error404'
import TestUpdate from './test/testUpdate'
import CreateSales from './test/CreateSales'
import Contact from './pages/others/Contact'

import Invoice from './components/Invoice'
import PrivateRoute from './pages/others/PrivateRoute'

import TestPPIC from './test/testPPIC'
import TestUpdatePPIC from './test/testUpdatePPIC'

import Tasks from './pages/Todos'

import DesignerApproval from './layouts/DesignerApproval'
import AccountsApproval from './layouts/AccountsApproval'
import Overview from './layouts/Overview'

import RMQuaratine from './layouts/RMQuaratine'

function App() {
    return (
        <section>
            <Router>
                <Routes>
                    {/* Fallback route for unmatched paths */}
                    <Route path="*" element={<Error404 />} />

                    {/* Public Routes */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/comingsoon" element={<ComingSoon />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/tasks" element={<Tasks />} />

                    <Route path="/overview" element={<Overview />} />
                    <Route path="/rm" element={<RMQuaratine />} />
                    {/* Test Routes */}
                    <Route
                        path="/testUpdate/:id"
                        element={
                            <PrivateRoute>
                                <TestUpdate />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/testUpdatePPIC/:id"
                        element={
                            <PrivateRoute>
                                <TestUpdatePPIC />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/testPPIC/:doc"
                        element={
                            <PrivateRoute>
                                <TestPPIC />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/createSales"
                        element={
                            <PrivateRoute>
                                <CreateSales />
                            </PrivateRoute>
                        }
                    />

                    {/* Approval Routes */}

                    <Route
                        path="/designer"
                        element={
                            <PrivateRoute>
                                <DesignerApproval />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/accounts"
                        element={
                            <PrivateRoute>
                                <AccountsApproval />
                            </PrivateRoute>
                        }
                    />

                    {/* Layout and Component Routes */}
                    <Route
                        path="/invoice/:id/:doc"
                        element={
                            <PrivateRoute>
                                <Invoice />
                            </PrivateRoute>
                        }
                    />

                    {/* Dashboard Routes */}
                    <Route
                        path="/dashboard/:path"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </Router>
        </section>
    )
}

export default App
