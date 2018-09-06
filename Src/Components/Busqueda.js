import React from 'react';
import { Container, Header, Item, Icon, Input, Content, Button, H3, Card, CardItem, Spinner, View } from 'native-base';
import { Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import Estilos from '../Css/Estilos';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { TodosLosUsuarios, Usuario } from '../Controllers/UsuarioController';

export default class Busqueda extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Usuarios: [], Backup: [], Load: false, Correcto: false, Yo: {} }
    }


    componentWillMount() {
        this.Usuarios();
        this.setState({ Yo: Usuario() })
    }

    Usuarios = () => {
        TodosLosUsuarios().then(res => {
            var us = [];
            res.forEach(Item => {
                if (Item.toJSON().Id !== this.state.Yo.uid) {
                    us.push(Item.toJSON());
                }
            })
            this.setState({ Usuarios: us, Backup: us, Correcto: true });
        });
        this.setState({ Load: true });
    }

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <Header searchBar rounded style={Estilos.Backgroud}>
                        <Item>
                            <Icon name='search' type='FontAwesome' style={Estilos.Color} />
                            <Input placeholder='Buscar' />
                            <Icon name='users' type='Feather' style={Estilos.Color} />
                        </Item>
                    </Header>
                    <ScrollView>
                        {this.state.Load ?
                            this.state.Correcto ? this.state.Usuarios.map((Item, Index) => {
                                return (
                                    <Card style={[Estilos.Card]} key={Index}>
                                        <CardItem bordered style={Estilos.Item}>
                                            <H3 style={Estilos.Color1}>{Item.Nombre}</H3>
                                        </CardItem>
                                        <CardItem bordered style={Estilos.Item} cardBody>
                                            <Image source={{ uri: Item.Foto }} style={Estilos.ImagenPerfil} resizeMode='cover' />
                                        </CardItem>
                                        <CardItem bordered style={Estilos.Item}>
                                            <Button transparent>
                                                <Icon active name='heartbeat' type='FontAwesome' style={Estilos.Color1} />
                                            </Button>
                                        </CardItem>
                                    </Card>
                                );
                            }) : null :
                            <View style={Estilos.CenterFlex}>
                                <Spinner color='violet' size='large' />
                            </View>
                        }
                    </ScrollView>
                </LinearGradient>
            </Container>
        );
    }

}