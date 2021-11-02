import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import '../../sass/main.scss';

import AuthProvider from '../contexts/AuthContext';
import DataProvider from '../contexts/DataContext';
import CRUDProvider from '../contexts/CRUDContext';

import PrivateRoute from './Routes/PrivateRoute/PrivateRoute';
import AdminRoute from './Routes/AdminRoute/AdminRoute';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword';
import Login from './Auth/Login/Login';

import CarForm from './CarForm/CarForm';
import UserCars from './UserAccount/UserCars/UserCars';
import UserFavourites from './UserAccount/UserFavourites/UserFavourites';
import UserPersonalData from './UserAccount/UserPersonalData/UserPersonalData';
import OneCarView from './Cars/OneCarView/OneCarView';
import SingUp from './Auth/SignUp/SignUp';
import StartPage from './StartPage/StartPage';
import UserProvider from '../contexts/UserContext';
import AllUsersList from './AdminAccount/AllUsersList/AllUsersList';
import ScrollToTop from '../helpers/ScrollToTop';

const App = () => {
	return (
		<Router>
			<ScrollToTop>
				<AuthProvider>
					<DataProvider>
						<UserProvider>
							<CRUDProvider>
								<Header />
								<Switch>
									<Route exact path="/" component={StartPage} />
									<PrivateRoute path={'/add-car'} component={CarForm} />
									<PrivateRoute
										path={'/my-cars/:adsStatus'}
										component={UserCars}
									/>
									<PrivateRoute
										path={'/my-personal-data'}
										component={UserPersonalData}
									/>
									<PrivateRoute
										path={'/my-favourites'}
										component={UserFavourites}
									/>
									<AdminRoute
										path={'/all-users-list'}
										component={AllUsersList}
									/>
									<Route path={'/login'} component={Login} />
									<Route path={'/sign-up'} component={SingUp} />
									<Route path={'/reset-password'} component={ForgotPassword} />
									<Route path={'/:car'} component={OneCarView} />
								</Switch>
								<Footer />
							</CRUDProvider>
						</UserProvider>
					</DataProvider>
				</AuthProvider>
			</ScrollToTop>
		</Router>
	);
};

export default App;
