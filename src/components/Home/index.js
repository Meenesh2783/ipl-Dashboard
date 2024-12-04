import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const dataInserting = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      imageUrl: eachTeam.team_image_url,
      id: eachTeam.id,
    }))
    this.setState({teamsData: dataInserting, isLoading: false})
  }

  renderTeamCard = () => {
    const {teamsData} = this.state
    return (
      <ul className="list-container">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamData={eachTeam} />
        ))}
      </ul>
    )
  }

  renderSpinner = () => {
    ;<div testid="loader" className="loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-container">
        <div className="header">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1 className="heading-text">IPL Dashboard</h1>
        </div>
        {isLoading ? this.renderSpinner() : this.renderTeamCard()}
      </div>
    )
  }
}

export default Home
