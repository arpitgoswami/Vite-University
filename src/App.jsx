import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from './pages/authorization/Login'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/others/ComingSoon'
import Error404 from './pages/others/Error404'
import TestUpdate from './test/testUpdate'
import TestCreate from './test/testCreate'
import Contact from './pages/others/Contact'

import Approval from './components/interface/Approval'
import Invoice from './components/Invoice'
import PrivateRoute from './pages/others/PrivateRoute'

import TestPPIC from './test/testPPIC'
import TestUpdatePPIC from './test/testUpdatePPIC'

import ExcelView from './components/interface/ExcelView'
import Tasks from './layouts/Tasks'

function App() {
    return (
        <section style={{ fontFamily: 'Poppins' }}>
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
                        path="/excelview"
                        element={
                            <PrivateRoute>
                                <ExcelView />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/testCreate/:doc"
                        element={
                            <PrivateRoute>
                                <TestCreate />
                            </PrivateRoute>
                        }
                    />

                    {/* Approval Routes */}
                    <Route
                        path="/approval"
                        element={
                            <PrivateRoute>
                                <Approval />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/approval/:id"
                        element={
                            <PrivateRoute>
                                <Approval />
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
