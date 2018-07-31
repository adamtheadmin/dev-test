import React, { Component } from 'react';
import dataset from '../data'

var last = null
function Row({applicant}){
  var showJob = applicant.job_id != last
  last = applicant.job_id
  return <tr>
        {showJob ? <td rowSpan={dataset.getJobCount(applicant.job_id)} className="job-name">{applicant.job.name}</td> : []}
        <td className="applicant-name">{applicant.name}</td>
        <td>
          <a href="mailto:{applicant.email}">{applicant.email}</a>
        </td>
        <td>
          <a href="{applicant.website}" target="_blank">{applicant.website}</a>
        </td>
        <td>
          {applicant.skills.map(s => s.name).join(", ")}
        </td>
        <td>{applicant.cover_letter}</td>
  </tr>
}

class Applicants extends Component {
  constructor(props){
    super(props)
    this.applicants = dataset.get()
  }

  renderRows(){
    var rows = [],
      applicants = this.applicants
    for(var x in applicants){
      var applicant = applicants[x]
      rows.push(<Row applicant={applicant} key={x} />)
    }
    return rows
  }

  render() {
    return (
      <table className="job-applicants">
        <thead>
          <tr>
            <th>Job</th>
            <th>Applicant Name</th>
            <th>Email Address</th>
            <th>Website</th>
            <th>Skills</th>
            <th>Cover Letter Paragraph</th>
          </tr>
        </thead>  
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default Applicants;
