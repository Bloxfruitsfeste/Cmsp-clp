function clearInput(id) {
  document.getElementById(id).value = "";
  toggleClearButton(id);
}

function toggleClearButton(id) {
  const input = document.getElementById(id);
  const clearButton = document.getElementById(`clear-${id}`);
  clearButton.style.display = input.value ? "block" : "none";
}

let notificationCount = 0;

function createAndShowNotification(message) {
  return new Promise((resolve) => {
    if (document.getElementById("notification-styles") === null) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
        .notification {
          position: fixed;
          right: -320px;
          background-color: #000;
          color: #fff;
          padding: 10px;
          border-radius: 10px;
          z-index: 1000;
          width: 320px;
          transition: right 0.5s ease;
          font-family: 'Poppins', sans-serif;
          border: 1px solid rgba(255,255,255,0.5);
          height: auto;
        }
        .notification-content {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .notification-content p {
          margin: 0;
          padding: 0;
          font-size: 0.8rem;
          word-break: break-word;
        }
        .progress-bar {
          margin-top: 8px;
          height: 5px;
          border-radius: 5px;
          width: 100%;
          overflow: hidden;
        }
        .progress-bar div {
          height: 100%;
          background: linear-gradient(90deg, orange, #f0f);
          background-size: 200% auto;
          animation: progressAnimation 5s linear forwards, gradientAnimation-218135ab 5s ease infinite;
        }
        @keyframes progressAnimation {
          from { width: 100%; }
          to { width: 0; }
        }
        @keyframes gradientAnimation-218135ab {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `;
      document.head.appendChild(style);
    }

    notificationCount++;
    const notification = document.createElement("div");
    notification.id = `notification-${notificationCount}`;
    notification.className = "notification";
    notification.style.bottom = `${20 + (notificationCount - 1) * 70}px`;
    notification.innerHTML = `
      <div class="notification-content">
        <p>${message}</p>
        <div class="progress-bar"><div></div></div>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.right = "20px";
    }, 10);

    setTimeout(() => {
      notification.style.right = "-320px";
      setTimeout(() => {
        notification.remove();
        notificationCount--;
        resolve();
      }, 500);
    }, 5000);
  });
}

createAndShowNotification("Site Criado por christoffer")
createAndShowNotification("Design por gabriel - bloxfruitsfeste")

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fazerlicaonormal(ra, password, damn) {
  if (ra === '' || password === '') {
      document.getElementById('ra').value = '';
      document.getElementById('pwd').value = '';
      return alert('preeche os dadoskk');
  }

  createAndShowNotification("SE VC PAGOU POR ISSO VC FOI SCAMMADO");
  createAndShowNotification("PEGANDO INFORMACOES...");
  createAndShowNotification("ATENCAO PODE DEMORAR UM TEMPO PARA APARECER A LICAO COMO CONCLUIDO");

  const raEncoded = encodeURIComponent(ra);
  const passwordEncoded = encodeURIComponent(password);

  const pre_getinfo_response = await fetch(`https://doritus.mmrcoss.tech/getporra?ra=${raEncoded}&password=${passwordEncoded}&porra=${damn}`);
  if (!pre_getinfo_response.ok) {
      createAndShowNotification('Erro ao entrar na conta :( tente dnv');
      return;
  }

  const getinfo_response = await pre_getinfo_response.json(); 

  createAndShowNotification("LOGADO NA CONTA, PEGANDO LICOES...");

  if (getinfo_response && getinfo_response.x_auth_key && getinfo_response.room_code) {
      const x_auth_key = getinfo_response.x_auth_key;
      const room_code = getinfo_response.room_code;

      let getlessons_response = await fetch(`https://doritus.mmrcoss.tech/getlesson_normal_2?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
      if (!getlessons_response.ok) {
          getlessons_response = await fetch(`https://doritus.mmrcoss.tech/getlesson_normal?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
          if (!getlessons_response.ok) {
              createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
              return;
          }
      }
      const lessons = await getlessons_response.text();

      createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
      if (lessons === '[]') {
          createAndShowNotification("Nenhuma Licao Encontrada bruh");
      }

      const catapimbas = JSON.parse(lessons); 
      for (const lesson of catapimbas) {
          const titleUpper = lesson.title.toUpperCase();
          if (titleUpper.includes("SARESP")) {
              createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
              continue; 
          }
          createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
          console.log(lesson.title);

          try {
              await delay(1000); 
              const dolesson_response = await fetch(`https://doritus.mmrcoss.tech/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
              if (dolesson_response.ok) {
                  console.log(`tuche, atividade ${lesson.title} FEITA!`);
              } else {
                  console.error(`Erro ao fazer a atividade ${lesson.title}`);
                  createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
              }
          } catch (error) {
              console.error('Erro na requisição dolesson:', error);
              createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
          }
      }
      
      createAndShowNotification("Verificando se sobrou atividades em 30Segundos...")
      await delay(30000);
      
      let getlessons_response_2 = await fetch(`https://doritus.mmrcoss.tech/getlesson_normal?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
      if (!getlessons_response_2.ok) {
          getlessons_response_2 = await fetch(`https://doritus.mmrcoss.tech/getlesson_normal?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
          if (!getlessons_response_2.ok) {
              createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
              return;
          }
      }
      const lessons_2 = await getlessons_response_2.text();

      createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
      if (lessons_2 === '[]') {
          createAndShowNotification("Nenhuma Licao Encontrada bruh");
      }

      const catapimbas_2 = JSON.parse(lessons_2); 
      for (const lesson of catapimbas_2) {
          const titleUpper = lesson.title.toUpperCase();
          if (titleUpper.includes("SARESP")) {
              createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
              continue; 
          }
          createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
          console.log(lesson.title);

          try {
              await delay(1000); 
              const dolesson_response = await fetch(`https://doritus.mmrcoss.tech/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
              if (dolesson_response.ok) {
                  console.log(`tuche, atividade ${lesson.title} FEITA!`);
              } else {
                  console.error(`Erro ao fazer a atividade ${lesson.title}`);
                  createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
              }
          } catch (error) {
              console.error('Erro na requisição dolesson:', error);
              createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
          }
      }
  } else {
      console.error('Resposta inválida do servidor');
      createAndShowNotification('Erro ao carregar lições. Verifique sua conexão e tente novamente.');
  }
}

async function fazerlicaoatrasada(ra, password, damn) {
  if (ra === '' || password === '') {
    document.getElementById('ra').value = '';
    document.getElementById('pwd').value = '';
    return alert('preeche os dadoskk');
  } 

  createAndShowNotification("SE VC PAGOU POR ISSO VC FOI SCAMMADO");
  createAndShowNotification("PEGANDO INFORMACOES...");
  createAndShowNotification("ATENCAO PODE DEMORAR UM TEMPO PARA APARECER A LICAO COMO CONCLUIDO");

  const raEncoded = encodeURIComponent(ra);
  const passwordEncoded = encodeURIComponent(password);

  const pre_getinfo_response = await fetch(`https://doritus.mmrcoss.tech/getporra?ra=${raEncoded}&password=${passwordEncoded}&porra=${damn}`);
  if (!pre_getinfo_response.ok) {
      createAndShowNotification('Erro ao entrar na conta :( tente dnv');
      return;
  }

  const getinfo_response = await pre_getinfo_response.json(); 

  createAndShowNotification("LOGADO NA CONTA, PEGANDO LICOES...");

  if (getinfo_response && getinfo_response.x_auth_key && getinfo_response.room_code) {
      const x_auth_key = getinfo_response.x_auth_key;
      const room_code = getinfo_response.room_code;

      let getlessons_response = await fetch(`https://doritus.mmrcoss.tech/getlesson_expired_2?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
      if (!getlessons_response.ok) {
          getlessons_response = await fetch(`https://doritus.mmrcoss.tech/getlesson_expired?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
          if (!getlessons_response.ok) {
              createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
              return;
          }
      }
      const lessons = await getlessons_response.text();

      createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
      if (lessons === '[]') {
          createAndShowNotification("Nenhuma Licao Encontrada bruh");
      }

      const catapimbas = JSON.parse(lessons); 
      for (const lesson of catapimbas) {
          const titleUpper = lesson.title.toUpperCase();
          if (titleUpper.includes("SARESP")) {
              createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
              continue; 
          }
          createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
          console.log(lesson.title);

          try {
              await delay(1000); 
              const dolesson_response = await fetch(`https://doritus.mmrcoss.tech/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
              if (dolesson_response.ok) {
                  console.log(`tuche, atividade ${lesson.title} FEITA!`);
              } else {
                  console.error(`Erro ao fazer a atividade ${lesson.title}`);
                  createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
              }
          } catch (error) {
              console.error('Erro na requisição dolesson:', error);
              createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
          }
      }
      
      createAndShowNotification("Verificando se sobrou atividades em 30Segundos...")
      await delay(30000);
      
      let getlessons_response_2 = await fetch(`https://doritus.mmrcoss.tech/getlesson_expired?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
      if (!getlessons_response_2.ok) {
          getlessons_response_2 = await fetch(`https://doritus.mmrcoss.tech/getlesson_expired?x_auth_key=${x_auth_key}&room_code=${room_code}&porra=${damn}`);
          if (!getlessons_response_2.ok) {
              createAndShowNotification('Erro ao carregar licoes. Verifique sua conexão e tente novamente.');
              return;
          }
      }
      const lessons_2 = await getlessons_response_2.text();

      createAndShowNotification("LICOES CARREGADAS COM SUCESSO!");
      if (lessons_2 === '[]') {
          createAndShowNotification("Nenhuma Licao Encontrada bruh");
      }

      const catapimbas_2 = JSON.parse(lessons_2); 
      for (const lesson of catapimbas_2) {
          const titleUpper = lesson.title.toUpperCase();
          if (titleUpper.includes("SARESP")) {
              createAndShowNotification(`Ignorando a ATIVIDADE: ${lesson.title}`);
              continue; 
          }
          createAndShowNotification(`FAZENDO LIÇÃO ${lesson.title}`);
          console.log(lesson.title);

          try {
              await delay(1000); 
              const dolesson_response = await fetch(`https://doritus.mmrcoss.tech/dolesso?x_auth_key=${x_auth_key}&room_code=${room_code}&lesson_id=${lesson.id}&porra=${damn}`);
              if (dolesson_response.ok) {
                  console.log(`tuche, atividade ${lesson.title} FEITA!`);
              } else {
                  console.error(`Erro ao fazer a atividade ${lesson.title}`);
                  createAndShowNotification(`Erro ao fazer a atividade ${lesson.title}. Tente novamente.`);
              }
          } catch (error) {
              console.error('Erro na requisição dolesson:', error);
              createAndShowNotification('Erro ao fazer a lição. Verifique sua conexão e tente novamente.');
          }
      }
  } else {
      console.error('Resposta inválida do servidor');
      createAndShowNotification('Erro ao carregar lições. Verifique sua conexão e tente novamente.');
  }
              }