import React from 'react'
import Relay from 'react-relay'
import AppMessage from './common/AppMessage';
import SearchLocation from './common/SearchLocation';
import ReactDOM from 'react-dom';
import RequestAppointmentByDefaultMutation from './mutation/RequestAppointmentByDefaultMutation'



class DefaultAppointmentRequest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message : "",
            country: '',
            city: '',
            location: ''
        } ;
    }

    onLocationEnter(location) {
        this.setState({ location : location.city ? location.city +', '+ location.country: location.city,
            city: location.city,
        });
    }

    onAppointmentRequest(e) {

        e.preventDefault();

        var city = this.state.city;
        var country = this.state.country;
        var countryCode = this.state.countryCode;
        var mail =  this.refs.email.value;
        var lastName =  this.refs.lastName.value;
        var firstName =  this.refs.firstName.value;
        var fatherFirstName =  this.refs.fatherFirstName.value;
        var motherFirstName =  this.refs.motherFirstName.value;
        var motherLastName =  this.refs.motherLastName.value;

        var requestAppointmentByDefaultMutation = new RequestAppointmentByDefaultMutation({
            viewer: this.props.viewer,
            viewerId: this.props.viewer.id,
            city: city,
            country: country,
            mail: mail,
            countryCode: countryCode,
            lastName: lastName,
            firstName: firstName,
            fatherFirstName: fatherFirstName,
            motherFirstName: motherFirstName,
            motherLastName: motherLastName
        });

        var onSuccess = () => this.context.router.push('/');

        var onFailure = (transaction) => this.setState({message : "Désolé, nous avons rencontré un problème lors de l'enregistrement." +
        " Contactez l'administrateur"});

        Relay.Store.commitUpdate(requestAppointmentByDefaultMutation, {onSuccess, onFailure})

    }

    render() {
        const text = this.state.message;


        return (
            <div className="">
                <div className="page-header col-md-6 center-block row">
                    <h3>
                        <span className="col-md-12">Fiche individuelle</span>
                    </h3>
                </div>

                {text? <AppMessage message={text} /> : ''}

                <form className="form-horizontal padding-20" name="add-property">
                    <div className="page-content row">
                        <div className="col-md-6 center-block">
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="lastName" id="lastName" className="form-control" placeholder="Nom de famille" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="firstName" id="firstName" className="form-control" placeholder="Prénom" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="fatherFirstName" id="fatherFirstName" className="form-control" placeholder="Prénom du père" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="motherLastName" id="motherLastName" className="form-control" placeholder="Nom de jeune fille de la mère" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon"></span>
                                        <input type="text" ref="motherFirstName" id="motherFirstName" className="form-control" placeholder="Prénom de la mère" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <div className="input-group col-md-12">
                                        <span className="input-group-addon">Email</span>
                                        <input type="text" ref="email" id="email" className="form-control" placeholder="Adresse mail" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <SearchLocation search="" placeHolder="Entrer la ville ou le pays"
                                                    onLocationEnter={this.onLocationEnter.bind(this)}
                                                    defaultValue=""
                                        {...this.props} />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-12">
                                    <inupt type="submit" style={{width:'100%'}}className="btn btn-primary" onClick={this.onAppointmentRequest.bind(this)}><b>Demander un RDV</b></inupt>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}


DefaultAppointmentRequest.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(DefaultAppointmentRequest, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
               id,
               ${SearchLocation.getFragment('viewer')}
          }
    `,
    }
});
