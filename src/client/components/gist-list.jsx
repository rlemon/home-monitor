import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import { browserHistory, Link } from 'react-router';

export default class GistList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			gists: [],
			offset: this.props.page * this.props.limit || 0
		};
	}
	async getGistList(offset, limit) {
		const response = await fetch(`/api/gist/list?offset=${offset}&limit=${limit}`, { 
			method: 'GET', 
			credentials: 'same-origin'
		});
		const json = await response.json();
		return json.rows;
	}
	async getGistCount() {
		const response = await fetch('/api/gist/count', { 
			method: 'GET', 
			credentials: 'same-origin'
		});
		const json = await response.json();
		return json.rows;
	}
	loadDataFromServer(forceOffset = null) {
		console.log('loading data');
		const {limit} = this.props;
		const offset = forceOffset === null ? this.state.offset : forceOffset;
		Promise.all([this.getGistCount(),this.getGistList(offset,limit)]).then(data => {
			const [[{count}],list] = data;
			this.setState({
				gists: list, 
				pageCount: Math.ceil( count / limit ),
				offset: offset
			});
		});
	}
	handlePageClick(data) {
		const {selected} = data;
		browserHistory.push(`/browse/${selected}`);
		console.log('pushed history');
		this.loadDataFromServer(selected * this.props.limit);
	}
	componentDidMount() {
		console.log('did mount');
		this.loadDataFromServer()
	}
	componentWillMount() {
		console.log('will mount');
	}
	componentDidUpdate() {
		console.log('did update');
	}
	componentWillUpdate() {
		console.log('will update');
	}

	render() {
		const rows = this.state.gists.map((details,i) => {
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
							<p className="pull-right">15 votes</p>
							<p>
								<span className="fa fa-star-o"></span>
								<span className="fa fa-star-o"></span>
								<span className="fa fa-star-o"></span>
								<span className="fa fa-star-o"></span>
								<span className="fa fa-star-o"></span>
							</p>
						</div>
					</div>
				</div>
			);
		});
		return (
			<div className="col-lg-12">
				{rows}
				<ReactPaginate  previousLabel={"previous"}
								nextLabel={"next"}
								breakLabel={<a href="">...</a>}
								breakClassName={"break-me"}
								pageCount={this.state.pageCount}
								marginPagesDisplayed={2}
								pageRangeDisplayed={5}
								initialPage={Number(this.props.page) || 0}
								onPageChange={data => this.handlePageClick(data)}
								containerClassName={"pagination"}
								subContainerClassName={"pages pagination"}
								activeClassName={"active"} />
			</div>
		);
	}
}