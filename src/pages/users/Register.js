import React from "react";
import { useFormik } from 'formik';

const Register = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: values => {
			console.log(values);
		}
	});


	return (
		<section className="py-5 overflow-hidden position-relative vh-100">
			<div className="top-0 d-none d-md-block position-absolute start-0 bg-dark w-75 h-100"></div>
			<div className="top-0 d-md-none position-absolute start-0 bg-primary w-100 h-100"></div>
			<div className="container mx-auto position-relative">
				<div className="row align-items-center">
					<div className="mb-5 col-12 col-lg-5">
						<div>
							<h2 className="mb-4 text-white display-5 fw-bold">
								Keep Track of your income and expenses flow
							</h2>
						</div>
					</div>
					<div className="col-12 col-lg-5 ms-auto">
						<div className="p-5 text-center rounded bg-light">
							<form onSubmit={formik.handleSubmit()}>
								<span className="text-muted">New User</span>
								<h3 className="mb-5 fw-bold">Register</h3>

								{/* Display err here */}
								{/* {userAppErr || userServerErr ? (
                  <div class="alert alert-danger" role="alert">
                    {userServerErr} {userAppErr}
                  </div>
                ) : null} */}
								<input
									// value={formik.values.firstname}
									// onChange={formik.handleChange("firstname")}
									// onBlur={formik.handleBlur("firstname")}
									className="mb-2 form-control"
									type="text"
									placeholder="First Name"
								/>
								{/* Err */}
								{/* <div className="mb-2 text-danger">
                  {formik.touched.firstname && formik.errors.firstname}
                </div> */}
								<input
									// value={formik.values.lastname}
									// onChange={formik.handleChange("lastname")}
									// onBlur={formik.handleBlur("lastname")}
									className="mb-2 form-control"
									type="text"
									placeholder="Last Name"
								/>
								{/* Err */}
								<div className="mb-2 text-danger">
									{/* {formik.touched.lastname && formik.errors.lastname} */}
								</div>
								<input
									value={formik.values.email}
									onChange={formik.handleChange("email")}
									onBlur={formik.handleBlur("email")}
									className="mb-2 form-control"
									type="email"
									placeholder="Email"
								/>
								{/* Err */}
								<div className="mb-2 text-danger">
									{/* {formik.touched.email && formik.errors.email} */}
								</div>
								<input
									value={formik.values.password}
									onChange={formik.handleChange("password")}
									onBlur={formik.handleBlur("password")}
									className="mb-2 form-control"
									type="password"
									placeholder="Password"
								/>
								{/* Err */}
								<div className="mb-2 text-danger">
									{/* {formik.touched.password && formik.errors.password} */}
								</div>

								<button
									type="submit"
									className="py-2 mb-4 btn btn-primary w-100"
								>
									Register
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Register;