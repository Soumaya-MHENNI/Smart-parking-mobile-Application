import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import BackButton from '../components/BackButton'
import DriverSignUp from '../screens/DriverSignUp'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { theme } from '../core/theme'



export default function SignupMode({navigation}){
    return(
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo/>
      <Paragraph>
        Please choose your Sign Up mode.
      </Paragraph>
      <Button icon="car"
        mode="contained"
        onPress={() => navigation.navigate('DriverSignUp')}
      >
    
        Driver
    </Button>

    <Button icon="account-tie"
        mode="contained"
        onPress={() => navigation.navigate('AgentDashboard')}
      >
        
        Agent
      </Button>
      <Button icon="shield-account"
        mode="outlined"
        onPress={() => navigation.navigate('AdminDashboard')}
      >
        {/*<MaterialIcons name="admin-panel-settings" size={24} color={theme.colors.primary} />*/}
        Administrator
      </Button>
    </Background>
    )
}