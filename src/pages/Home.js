import React from "react";
import { Link } from "react-router-dom";
import bg from "../img/data.svg";
const Home = () => {
	return (
		<>
			<section className="pb-5 position-relative">
				<img
					className="top-0 bottom-0 d-none d-lg-block position-absolute start-0 w-50 h-100 img-fluid "
					style={{ objectFit: "cover" }}
					src={bg}
					alt=""
				/>
				<div className="position-relative">
					<div className="container">
						<div className="pt-5 row">
							<div className="col-12 col-lg-5 ms-auto">
								<div className="mb-5">
									<h2 className="mb-5 display-4 fw-bold">
										Keep Track of Your Income & Expenses
									</h2>
									<p className="mb-5 lead text-muted">
										View all your income and expenses flow from your team in one
										dashboard
									</p>
									<div className="flex-wrap d-flex">
										<Link
											to="/profile"
											className="mb-2 btn btn-primary me-2 mb-sm-0"
										>
											Track your performance
										</Link>
										<a
											target="_blank"
											className="mb-2 btn btn-secondary mb-sm-0"
											rel="noreferrer"
											href="https://www.youtube.com/channel/UCvu6J9q1AM6q4xysGqAvVyw"
										>
											Video Tutorial
										</a>
									</div>
								</div>
								<h1 className="text-danger">Admin Login </h1>
								<p>User name: admin@gmail.com</p>
								<p>password: 12345</p>
								<div className="pt-5 row align-items-center">
									<div className="mb-5 text-center col-6 col-md-4 col-lg-3 col-xl-2">
										<img
											className="d-inline-block img-fluid"
											src="bootstrap5-plain-assets/logos/slack.png"
											alt=""
										/>
									</div>
									<div className="mb-5 text-center col-6 col-md-4 col-lg-3 col-xl-2">
										<img
											className="d-inline-block img-fluid"
											src="bootstrap5-plain-assets/logos/dropbox.png"
											alt=""
										/>
									</div>
									<div className="mb-5 text-center col-6 col-md-4 col-lg-3 col-xl-2">
										<img
											className="d-inline-block img-fluid"
											src="bootstrap5-plain-assets/logos/spotify.png"
											alt=""
										/>
									</div>
									<div className="mb-5 text-center col-6 col-md-4 col-lg-3 col-xl-2">
										<img
											className="d-inline-block img-fluid"
											src="bootstrap5-plain-assets/logos/stripe.png"
											alt=""
										/>
									</div>
									<div className="mb-5 text-center col-6 col-md-4 col-lg-3 col-xl-2">
										<img
											className="d-inline-block img-fluid"
											src="bootstrap5-plain-assets/logos/netflix.png"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;
