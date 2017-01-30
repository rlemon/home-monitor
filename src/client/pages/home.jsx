import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { browserHistory, Link } from 'react-router';
import { page } from '../dataLoading';
import dataStore from '../dataStore';

@page({
	queries: {
		gistList: ({ page = 0 }) => {
			return dataStore.getGistList(page);
		},
		gistCount: () => dataStore.getGistCount()
	}
})

export default class HomePage extends Component {
	static contextTypes = {
		currentUser: React.PropTypes.object
	}
	constructor(props) {
		super(props);
	}
	handlePageClick(data) {
		const {selected} = data;
		browserHistory.push(`/browse/${selected}`);
	}
	render() {
		const rows = this.props.gistList.map((details,i) => {
			return (
				<div className="col-sm-4 col-lg-4 col-md-4" key={i}>
					<div className="thumbnail">
						<img src="http://placehold.it/320x150" alt="" />
						<div className="caption">
							<h4><Link to={`/view/${details.id}`}>{details.name}</Link>
							</h4>
							<p> {details.description} </p>
						</div>
						<div className="ratings">
							<p className="pull-right">
								<button className="unstyled-button"><span className="fa fa-thumbs-o-up"></span></button>
								<span className="small-count">1,234</span>
								<button className="unstyled-button"><span className="fa fa-thumbs-o-down"></span></button>
								<span className="small-count">99</span>
							</p>
							<p className="small-count">
							2,345 installs
							</p>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="container">
				<div className="row">{rows}</div>
				<div className="row">
					<ReactPaginate  previousLabel={"previous"}
						nextLabel={"next"}
						breakLabel={<a href="">...</a>}
						breakClassName={"break-me"}
						pageCount={Math.ceil(this.props.gistCount / 6)}
						marginPagesDisplayed={2}
						pageRangeDisplayed={5}
						forcePage={Number(this.props.params.page) || 0}
						initialPage={Number(this.props.params.page) || 0}
						onPageChange={data => this.handlePageClick(data)}
						containerClassName={"row pagination"}
						subContainerClassName={"pages pagination"}
						activeClassName={"active"} />
				</div>
			</div>
		);
	}
}
