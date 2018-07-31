import React, { Component } from 'react';
import dataset from '../data'

var last = null
function Row({applicant}){
  var showJob = applicant.job_id != last
  last = applicant.job_id
  var ret = [<tr>
          {showJob ? <td rowSpan={dataset.getJobRowspan(applicant.job_id)} className="job-name">{applicant.job.name}</td> : []}
          <td rowSpan={applicant.skills.length} className="applicant-name">{applicant.name}</td>
          <td rowSpan={applicant.skills.length}>
            <a href="mailto:{applicant.email}">{applicant.email}</a>
          </td>
          <td rowSpan={applicant.skills.length}>
            <a href="{applicant.website}" target="_blank">{applicant.website}</a>
          </td>
          <td>
            {applicant.skills[0].name}
          </td>
          <td rowSpan={applicant.skills.length}>{applicant.cover_letter}</td>
    </tr>]

    for(var x in applicant.skills)
      if(x > 0)
        ret.push(<tr>
          <td>{applicant.skills[x].name}</td>
          </tr>)
    return ret
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
        <tfooter>
          <tr>
            <td colspan="6">{this.applicants.length} Applicants, {dataset.getUniqueSkills().length} Unique Skills</td>
          </tr>
        </tfooter>
      </table>
    );
  }
}

export default Applicants;
