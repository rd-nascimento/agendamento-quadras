// script.js

document.addEventListener('DOMContentLoaded', () => {
    const courtSelect = document.getElementById('courtSelect');
    const dateSelect = document.getElementById('dateSelect');
    const availableTimesContainer = document.getElementById('availableTimes');
    const selectedTimeInput = document.getElementById('selectedTime');
    const bookingForm = document.getElementById('bookingForm');
    const confirmationMessage = document.getElementById('confirmationMessage');

    // Simulação de dados de horários disponíveis (em uma aplicação real, viriam de um backend/API)
    const availableSlots = {
        'quadra1': { // Futebol Society - Campo 1
            '2025-07-15': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00'],
            '2025-07-16': ['10:00', '11:00', '17:00', '18:00', '20:00'],
            '2025-07-17': ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
            // Adicione mais datas e horários conforme necessário
        },
        'quadra2': { // Basquete - Principal
            '2025-07-15': ['08:00', '09:00', '13:00', '14:00', '17:00'],
            '2025-07-16': ['09:00', '10:00', '15:00', '16:00', '19:00'],
        },
        'quadra3': { // Vôlei de Areia
            '2025-07-15': ['10:00', '11:00', '16:00', '17:00'],
            '2025-07-17': ['10:00', '11:00', '12:00', '15:00', '16:00', '17:00'],
        },
        'quadra4': { // Poliesportiva - Interna
            '2025-07-15': ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
        }
    };

    // Define a data mínima no input de data (hoje)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses são 0-indexados
    const day = String(today.getDate()).padStart(2, '0');
    dateSelect.min = `${year}-${month}-${day}`;

    // Função para renderizar os horários disponíveis
    const renderAvailableTimes = () => {
        const selectedCourt = courtSelect.value;
        const selectedDate = dateSelect.value;
        availableTimesContainer.innerHTML = '';
        selectedTimeInput.value = ''; // Limpa o horário selecionado

        if (selectedCourt && selectedDate) {
            const times = availableSlots[selectedCourt] ? availableSlots[selectedCourt][selectedDate] : [];

            if (times && times.length > 0) {
                times.forEach(time => {
                    const badge = document.createElement('span');
                    badge.classList.add('badge', 'bg-info', 'text-dark', 'p-2');
                    badge.textContent = time;
                    badge.setAttribute('data-time', time);
                    badge.addEventListener('click', () => {
                        // Remove a seleção de outros badges
                        document.querySelectorAll('#availableTimes .badge').forEach(b => {
                            b.classList.remove('selected', 'bg-primary');
                            b.classList.add('bg-info', 'text-dark');
                        });
                        // Adiciona seleção ao badge clicado
                        badge.classList.add('selected', 'bg-primary');
                        badge.classList.remove('bg-info', 'text-dark');
                        selectedTimeInput.value = time; // Armazena o horário no input oculto
                    });
                    availableTimesContainer.appendChild(badge);
                });
            } else {
                availableTimesContainer.innerHTML = '<span class="badge bg-warning p-2">Nenhum horário disponível para esta data.</span>';
            }
        } else {
            availableTimesContainer.innerHTML = '<span class="badge bg-secondary p-2">Selecione uma quadra e data</span>';
        }
    };

    // Event Listeners para atualizar horários
    courtSelect.addEventListener('change', renderAvailableTimes);
    dateSelect.addEventListener('change', renderAvailableTimes);

    // Lidar com o envio do formulário
    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const selectedCourt = courtSelect.options[courtSelect.selectedIndex].text;
        const selectedDate = dateSelect.value;
        const selectedTime = selectedTimeInput.value;
        const userName = document.getElementById('userName').value;
        const userPhone = document.getElementById('userPhone').value;

        // Validação básica
        if (!selectedCourt || selectedCourt === "Escolha uma quadra...") {
            alert('Por favor, selecione uma quadra.');
            return;
        }
        if (!selectedDate) {
            alert('Por favor, selecione uma data.');
            return;
        }
        if (!selectedTime) {
            alert('Por favor, selecione um horário disponível.');
            return;
        }
        if (!userName.trim() || !userPhone.trim()) {
            alert('Por favor, preencha seu nome e telefone.');
            return;
        }

        // Simula o processamento do agendamento
        // Em uma aplicação real, aqui você faria uma requisição AJAX/Fetch para um backend
        console.log("Dados do Agendamento:", {
            quadra: selectedCourt,
            data: selectedDate,
            horario: selectedTime,
            nome: userName,
            telefone: userPhone
        });

        // Exibe mensagem de confirmação
        confirmationMessage.innerHTML = `
            Agendamento Confirmado! 🎉<br>
            Quadra: <strong>${selectedCourt}</strong><br>
            Data: <strong>${new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</strong><br>
            Horário: <strong>${selectedTime}</strong><br>
            Nome: <strong>${userName}</strong><br>
            Telefone: <strong>${userPhone}</strong><br>
            Em breve entraremos em contato para mais detalhes.
        `;
        confirmationMessage.classList.remove('d-none'); // Torna a mensagem visível
        confirmationMessage.scrollIntoView({ behavior: 'smooth' }); // Rola até a mensagem

        // Opcional: Limpar o formulário após o agendamento
        bookingForm.reset();
        availableTimesContainer.innerHTML = '<span class="badge bg-secondary p-2">Selecione uma quadra e data</span>';
        selectedTimeInput.value = '';
        courtSelect.value = ''; // Reseta para a opção padrão
    });

    // Renderiza os horários iniciais (ou uma mensagem para selecionar)
    renderAvailableTimes();
});