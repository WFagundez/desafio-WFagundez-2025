class AbrigoAnimais {
    constructor() {
      this.animais = {
        Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
        Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
        Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
        Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
        Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
        Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
        Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
      };
  
      this.brinquedosValidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];
    }
  
    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
      try {
        const pessoa1 = this._validarBrinquedos(brinquedosPessoa1);
        const pessoa2 = this._validarBrinquedos(brinquedosPessoa2);
        const animaisOrdem = this._validarAnimais(ordemAnimais);
  
        const resultado = [];
        const adotados = { pessoa1: 0, pessoa2: 0 };
  
        for (let nome of animaisOrdem) {
          const animal = this.animais[nome];
  
          let podeP1 = this._podeAdotar(pessoa1, animal, resultado);
          let podeP2 = this._podeAdotar(pessoa2, animal, resultado);
  
          let adotadoPor = 'abrigo';
  
          
          if (podeP1 && podeP2) {
            
            if (animal.tipo === 'gato') {
              adotadoPor = 'abrigo';
            } else {
              
              if (adotados.pessoa1 < 3 && adotados.pessoa2 >= 3) {
                adotadoPor = 'pessoa 1';
                adotados.pessoa1++;
              } else if (adotados.pessoa2 < 3 && adotados.pessoa1 >= 3) {
                adotadoPor = 'pessoa 2';
                adotados.pessoa2++;
              }
              
            }
          } else if (podeP1 && adotados.pessoa1 < 3) {
            adotadoPor = 'pessoa 1';
            adotados.pessoa1++;
          } else if (podeP2 && adotados.pessoa2 < 3) {
            adotadoPor = 'pessoa 2';
            adotados.pessoa2++;
          }
  
          resultado.push(`${nome} - ${adotadoPor}`);
        }
  
        return { lista: resultado.sort() };
      } catch (e) {
        return { erro: e.message };
      }
    }
  
    _validarBrinquedos(lista) {
      const brinquedos = lista.split(',').map(b => b.trim());
  
      const set = new Set(brinquedos);
      if (set.size !== brinquedos.length) {
        throw new Error('Brinquedo inválido');
      }
  
      for (let b of brinquedos) {
        if (!this.brinquedosValidos.includes(b)) {
          throw new Error('Brinquedo inválido');
        }
      }
  
      return brinquedos;
    }
  
    _validarAnimais(lista) {
      const animais = lista.split(',').map(a => a.trim());
  
      const set = new Set(animais);
      if (set.size !== animais.length) {
        throw new Error('Animal inválido');
      }
  
      for (let a of animais) {
        if (!this.animais[a]) {
          throw new Error('Animal inválido');
        }
      }
  
      return animais;
    }
  
    _podeAdotar(brinquedosPessoa, animal, resultado) {
      
      if (animal === this.animais['Loco']) {
        return resultado.some(r => r.includes('pessoa'));
      }
  
      let idx = 0;
      for (let b of brinquedosPessoa) {
        if (b === animal.brinquedos[idx]) {
          idx++;
        }
        if (idx === animal.brinquedos.length) {
          return true;
        }
      }
      return false;
    }
  }
  
  export { AbrigoAnimais as AbrigoAnimais };
  
  
  