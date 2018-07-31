import * as applicants from './applicant.json'
import * as jobs from './jobs.json'
import * as skills from './skill.json'

class data {

  constructor(){
    //build relationships
    for(var x in applicants){
      var applicant = applicants[x]
      //resolve job
      var search = jobs.filter(j => j.id == applicant.job_id)
      if(search.length)
        applicant.job = search[0]

      //resolve skills
      applicant.skills = skills.filter(s => applicant.id == s.applicant_id)
    }
    this.applicants = applicants.sort((a, b) => a.job_id > b.job_id ? 1 : -1)
  }

  get(){
    return this.applicants
  }

  getUniqueSkills(){
    return skills.map(s => s.name).reverse().filter(function (e, i, arr) {
        return arr.indexOf(e, i+1) === -1;
    }).reverse()
  }

  getJobRowspan(position){
    var i = 0
    for(var x in this.applicants){
      var applicant = this.applicants[x]
      if(applicant.job_id != position)
        continue
      i += applicant.skills.length
    }
    return i
  }

}

export default new data