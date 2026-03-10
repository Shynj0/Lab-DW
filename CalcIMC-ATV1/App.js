import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard } from 'react-native';

export default function App() {
  // Gerenciamento de estado com hooks (useState)
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [resultado, setResultado] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('#000');
  const [erro, setErro] = useState('');

  // Função lógica de classificação do IMC com as cores sugeridas
  const getClassificacao = (imc) => {
    if (imc < 18.5) {
      return { texto: 'Abaixo do Peso', cor: '#F4D03F' }; // Laranja Claro / Amarelo
    } else if (imc >= 18.5 && imc <= 24.9) {
      return { texto: 'Peso Normal (Eutrofia)', cor: '#2ECC71' }; // Verde
    } else if (imc >= 25.0 && imc <= 29.9) {
      return { texto: 'Sobrepeso', cor: '#D4AC0D' }; // Amarelo Escuro
    } else if (imc >= 30.0 && imc <= 34.9) {
      return { texto: 'Obesidade Grau I', cor: '#E67E22' }; // Laranja / Vermelho Claro
    } else if (imc >= 35.0 && imc <= 39.9) {
      return { texto: 'Obesidade Grau II (Severa)', cor: '#E74C3C' }; // Vermelho
    } else {
      return { texto: 'Obesidade Grau III (Mórbida)', cor: '#922B21' }; // Vermelho Escuro
    }
  };

  const calcularIMC = () => {
    Keyboard.dismiss(); // Esconde o teclado
    setErro('');
    setResultado(null);
    setClassificacao('');

    // Tratamento para substituir vírgula por ponto (caso o usuário digite)
    const pesoNum = parseFloat(peso.replace(',', '.'));
    const alturaNum = parseFloat(altura.replace(',', '.'));

    // Validação de campos vazios ou inválidos
    if (!peso || !altura) {
      setErro('Por favor, preencha o peso e a altura.');
      return;
    }

    if (isNaN(pesoNum) || isNaN(alturaNum) || alturaNum <= 0 || pesoNum <= 0) {
      setErro('Valores inválidos. A altura e o peso devem ser maiores que zero.');
      return;
    }

    // Cálculo do IMC
    const imc = pesoNum / (alturaNum * alturaNum);
    
    // Arredondando para 2 casas decimais
    setResultado(imc.toFixed(2));

    // Obtendo a classificação e a cor
    const info = getClassificacao(imc);
    setClassificacao(info.texto);
    setCor(info.cor);
  };

  const limpar = () => {
    setPeso('');
    setAltura('');
    setResultado(null);
    setClassificacao('');
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora de IMC</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Peso (kg). Ex: 70.5"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m). Ex: 1.75"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
      </View>

      {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

      <View style={styles.buttonContainer}>
        <Button title="Calcular IMC" onPress={calcularIMC} color="#3498DB" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Limpar" onPress={limpar} color="#95A5A6" />
      </View>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Seu IMC: {resultado}</Text>
          <Text style={[styles.resultClassificacao, { color: cor }]}>
            {classificacao}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#2C3E50',
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 55,
    backgroundColor: '#FFF',
    borderColor: '#BDC3C7',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  errorText: {
    color: '#E74C3C',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
  },
  resultClassificacao: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
});