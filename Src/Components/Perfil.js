import React from 'react';
import { Container, Content, H3, Thumbnail, Card, CardItem, Icon, Body, Right, Form, Item, Input, Button, Label, Text } from 'native-base';
import Estilos from '../Css/Estilos';
import { AlertaSpinnerModule, AlertasModule, AlertaConfirmModule } from 'react-native-increibles-alertas';
import { LinearGradient, Permissions } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';
import ModalBox from 'react-native-modalbox';
import { getDatos, CambiarImagen } from '../Controllers/UsuarioController';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Usuario: { Nombre: '', Foto: 'https://sd.keepcalm-o-matic.co.uk/i/keep-calm-404-profile-pic-not-found.png', Token: '' },
            Nombre: ''
        }
        this.Cards = [
            {
                Texto: 'Seguidores',
                NombreIcono: 'heartbeat',
                Func: () => { }
            },
            {
                Texto: 'Seguidos',
                NombreIcono: 'hand-peace-o',
                Func: () => { }
            },
            {
                Texto: 'Cambiar Foto',
                NombreIcono: 'image',
                Func: this.CambiarImagen
            },
            {
                Texto: 'Cambiar Nombre',
                NombreIcono: 'user',
                Func: () => { this.refs.Modal.open() }
            },
            {
                Texto: 'Salir',
                NombreIcono: 'remove',
                Func: this.Salir
            },
            {
                Texto: 'Borrar Cuenta',
                NombreIcono: 'user-times',
                Func: this.BorrarCuenta
            }
        ];
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    componentWillMount() {
        getDatos('User').then(user => {
            this.setState({ Usuario: user });
        }).catch(err => {
            this.props.navigation.push('Login');
        })
    }

    Salir = () => {

    }

    BorrarCuenta = () => {

    }

    CambiarNombre = () => {

    }

    CambiarImagen = async () => {
        CambiarImagen().then(() => {
        }).catch(err => {
        })
    }

    render() {
        return (
            <Container>
                <ModalBox style={Estilos.Modal} position='center' ref='Modal' isDisabled={false} backdropPressToClose swipeToClose={false} onClosed={() => { this.setState({ Nombre: '' }) }}>
                    <Container>
                        <Content padder contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={2}>
                                    <Form style={[Estilos.Content, Estilos.Start]}>
                                        <Item floatingLabel last>
                                            <Icon name='user' style={Estilos.Color} type='FontAwesome' />
                                            <Label style={Estilos.Color}>Nombre</Label>
                                            <Input style={Estilos.Color} onChangeText={text => this.setState({ Nombre: text })} />
                                        </Item>
                                    </Form>
                                </Row>
                                <Row size={1}>
                                    <Col size={1}>
                                        <Button block style={Estilos.Backgroud} onPress={this.CambiarNombre.bind(this)}>
                                            <Text>Ok</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </Container>
                </ModalBox>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={1} style={Estilos.Backgroud}>
                                    <Col style={[Estilos.CenterFlex, Estilos.Espaciado]}>
                                        <Thumbnail large source={{ uri: this.state.Usuario.Foto }} />
                                        <H3 style={Estilos.Color1}>{this.state.Usuario.Nombre}</H3>
                                    </Col>
                                </Row>
                                <Row size={4}>
                                    <Col style={Estilos.Espaciado}>
                                        {
                                            this.Cards.map((Item, Key) => {
                                                return (
                                                    <Card style={[Estilos.Card]} key={Key}>
                                                        <CardItem bordered style={Estilos.Item} button onPress={Item.Func.bind(this)}>
                                                            <Icon name={Item.NombreIcono} type='FontAwesome' style={Estilos.Color} />
                                                            <H3 style={Estilos.Color}>{Item.Texto}</H3>
                                                            <Body />
                                                            <Right>
                                                                <Icon name='hand-o-right' type='FontAwesome' style={Estilos.Color} />
                                                            </Right>
                                                        </CardItem>
                                                    </Card>
                                                );
                                            })
                                        }
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }

}