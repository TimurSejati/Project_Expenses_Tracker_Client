import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Form validations
const formSchema = Yup.object({
	email: Yup.string().required("Email is required"),
	password: Yup.string().required("Password is required"),
})


const Login = () => {

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		onSubmit: values => {
			console.log(values);
		},
		validationSchema: formSchema
	});

	return (
		<section
			style={{ height: "100vh" }}
			className="py-5 overflow-hidden position-relative bg-warning"
		>
			<div className="top-0 d-none d-md-block position-absolute start-0 bg-dark w-75 h-100"></div>
			<div className="top-0 d-md-none position-absolute start-0 bg-primary w-100 h-100"></div>
			<div className="container mx-auto position-relative">
				<div className="row align-items-center">
					<div className="mb-5 col-12 col-lg-5">
						<div>
							<h2 className="mb-4 text-white display-5 fw-bold">
								Keep Track of what you are spending
							</h2>
							<hr className="text-warning w-100" />
						</div>
					</div>
					<div className="col-12 col-lg-5 ms-auto">
						<div className="p-5 text-center rounded bg-light">
							<span className="text-muted">Sign In</span>
							<h3 className="mb-5 fw-bold">Login to your account</h3>
							{/* Display Err */}

							{/* {userAppErr || userServerErr ? (
                <div class="alert alert-danger" role="alert">
                  {userServerErr} {userAppErr}
                </div>
              ) : null} */}
							<form onSubmit={formik.handleSubmit}>
								<input
									value={formik.values.email}
									onChange={formik.handleChange("email")}
									onBlur={formik.handleBlur("email")}
									className="mb-2 form-control"
									type="email"
									placeholder="E-mail address"
								/>
								{/* Err */}
								<div className="mb-2 text-danger">
									{formik.touched.email && formik.errors.email}
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
									{formik.touched.password && formik.errors.password}
								</div>

								<div>
									<button
										type="submit"
										className="py-2 mb-4 btn btn-primary w-100"
									>
										Login
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Login;