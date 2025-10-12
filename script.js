// Array de tarefas constantes (em ordem alfabética)
const TASKS = [
    'Adiantamento salarial',
    'Admissão',
    'Ajuste no ponto',
    'Anexos',
    'Aporte final de semana',
    'Atividade complementares',
    'Aviso prévio',
    'Banco de horas',
    'Boletos',
    'Calculo',
    'Cartão banco do Brasil',
    'Cartão cooporativo',
    'Cartão Santander',
    'Cartão Visa',
    'Contratos',
    'Contas a pagar',
    'Contas a pagar de outro dia',
    'Dados dos funcionários',
    'Demissão de funcionários',
    'Documentação',
    'Empréstimos',
    'Encargos',
    'Entregadores',
    'Exame admissional',
    'Exame demisional',
    'Extras',
    'Fechamento de caixa',
    'Feriados',
    'Férias',
    'Fluxo de caixa',
    'Folga de pagamento',
    'Folgas Funcionários',
    'Fornecedores',
    'Funcionario para contratar',
    'Gestão de VEM',
    'Gorjetas',
    'Gratificações',
    'Juridico',
    'Impressão de documentos',
    'Impostos',
    'Imprevistos',
    'Instruções',
    'Ligações',
    'Mensagens para os funcionários',
    'Movimentação de caixa',
    'Outros',
    'Ponto',
    'Pagamentos',
    'Race',
    'Recados',
    'Recibos de pagamento',
    'Relatório de compras',
    'Relatório de vendas',
    'Relatório de faturamento',
    'Relatório em geral',
    'Rescisão',
    'Rescisão (VIP)',
    'Salários (Oficial)',
    'Salários (VIP)',
    'Transporte colaboradores',
    'Treinamento',
    'Verificar e-mail'
];

// Estado das tarefas
let taskStatus = [];
let currentStatusFilter = 'all';

// Elementos do DOM
const taskList = document.getElementById('task-list');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search');
const filterAllBtn = document.getElementById('filter-all');
const filterNormalBtn = document.getElementById('filter-normal');
const filterPendingBtn = document.getElementById('filter-pending');
const filterOkBtn = document.getElementById('filter-ok');
const generateDailyReportBtn = document.getElementById('generate-daily-report');
const generateReportAllBtn = document.getElementById('generate-report-all');
const generateReportNormalBtn = document.getElementById('generate-report-normal');
const generateReportOkBtn = document.getElementById('generate-report-ok');
const generateReportPendingBtn = document.getElementById('generate-report-pending');

// Elementos do menu e calculadora
const menuToggleBtn = document.getElementById('menu-toggle');
const menuDropdown = document.getElementById('menu-dropdown');
const calculatorBtn = document.getElementById('calculator-btn');
const calculatorModal = document.getElementById('calculator-modal');
const closeCalculatorBtn = document.getElementById('close-calculator');
const calcDisplay = document.getElementById('calc-display');
const calcHistory = document.getElementById('calc-history');

// Função para filtrar tarefas baseado na busca e status
function filterTasks() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredTasks = taskStatus;
    
    // Filtrar por status
    if (currentStatusFilter !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.status === currentStatusFilter);
    }
    
    // Filtrar por busca de texto
    if (searchTerm !== '') {
        filteredTasks = filteredTasks.filter(task => 
            task.text.toLowerCase().includes(searchTerm) ||
            (task.observations && task.observations.toLowerCase().includes(searchTerm))
        );
    }
    
    return filteredTasks;
}

// Função para renderizar as tarefas
function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = filterTasks();
    
    if (filteredTasks.length === 0 && searchInput.value.trim() !== '') {
        // Mostrar mensagem quando não há resultados
        const noResults = document.createElement('li');
        noResults.className = 'no-results';
        noResults.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #666;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" style="margin-bottom: 16px;">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                </svg>
                <h3 style="margin-bottom: 8px; color: #999;">Nenhuma tarefa encontrada</h3>
                <p style="color: #aaa;">Tente usar termos diferentes na sua busca</p>
            </div>
        `;
        taskList.appendChild(noResults);
        return;
    }
    
    filteredTasks.forEach((task, index) => {
        const originalIndex = taskStatus.findIndex(t => t === task);
        const li = document.createElement('li');
        li.className = 'task-item';
        
        // Adicionar classe de status para estilização
        if (task.status === 'OK') {
            li.classList.add('status-ok');
        } else if (task.status === 'Pendente') {
            li.classList.add('status-pending');
        } else if (task.status === 'Normal') {
            li.classList.add('status-normal');
        }
        
        // Container principal do conteúdo
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        const statusContainer = document.createElement('div');
        statusContainer.className = 'status-container';
        
        // Botão Normal
        const normalButton = document.createElement('div');
        normalButton.className = 'status-indicator';
        normalButton.textContent = 'Normal';
        if (task.status === 'Normal') {
            normalButton.classList.add('status-normal');
        }
        
        // Botão OK
        const okButton = document.createElement('div');
        okButton.className = 'status-indicator';
        okButton.textContent = 'OK';
        if (task.status === 'OK') {
            okButton.classList.add('status-ok');
        }
        
        // Botão Pendente
        const pendingButton = document.createElement('div');
        pendingButton.className = 'status-indicator';
        pendingButton.textContent = 'Pendente';
        if (task.status === 'Pendente') {
            pendingButton.classList.add('status-pending');
        }
        
        // Event listeners para os botões
        normalButton.addEventListener('click', () => {
            taskStatus[originalIndex].status = 'Normal';
            renderTasks();
        });
        
        okButton.addEventListener('click', () => {
            taskStatus[originalIndex].status = 'OK';
            renderTasks();
        });
        
        pendingButton.addEventListener('click', () => {
            taskStatus[originalIndex].status = 'Pendente';
            renderTasks();
        });
        
        statusContainer.appendChild(normalButton);
        statusContainer.appendChild(okButton);
        statusContainer.appendChild(pendingButton);
        
        taskContent.appendChild(taskText);
        taskContent.appendChild(statusContainer);
        
        // Container de observações
        const observationsContainer = document.createElement('div');
        observationsContainer.className = 'observations-container';
        
        const observationsLabel = document.createElement('label');
        observationsLabel.className = 'observations-label';
        observationsLabel.textContent = 'Observações:';
        
        const observationsInput = document.createElement('textarea');
        observationsInput.className = 'observations-input';
        observationsInput.placeholder = 'Adicione observações sobre esta tarefa...';
        observationsInput.value = task.observations || '';
        
        // Event listener para salvar observações
        observationsInput.addEventListener('input', function() {
            taskStatus[originalIndex].observations = this.value;
        });
        
        observationsContainer.appendChild(observationsLabel);
        observationsContainer.appendChild(observationsInput);
        
        li.appendChild(taskContent);
        li.appendChild(observationsContainer);
        taskList.appendChild(li);
    });
}

// Função para alternar status da tarefa
function toggleTaskStatus(index) {
    taskStatus[index].status = taskStatus[index].status === 'Pendente' ? 'OK' : 'Pendente';
    renderTasks();
}

// Função para limpar a busca
function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.classList.remove('visible');
    renderTasks();
}

// Função para atualizar visibilidade do botão de limpar
function updateClearButton() {
    if (searchInput.value.trim() !== '') {
        clearSearchBtn.classList.add('visible');
    } else {
        clearSearchBtn.classList.remove('visible');
    }
}

// Função para atualizar filtros de status
function updateStatusFilter(status) {
    currentStatusFilter = status;
    
    // Atualizar botões ativos
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.querySelector(`[data-status="${status}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    
    renderTasks();
}

// Função para gerar relatório PDF com design melhorado
function generatePDFReport(reportType = 'all') {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Data atual
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const currentTime = now.toLocaleTimeString('pt-BR');
    
    // Filtrar tarefas baseado no tipo de relatório
    let filteredTasks;
    let reportTitle;
    let statusColor = '#587c6c';
    
    switch (reportType) {
        case 'ok':
            filteredTasks = taskStatus.filter(task => task.status === 'OK');
            reportTitle = `Relatório Tarefas Concluídas (OK)`;
            statusColor = '#28a745';
            break;
        case 'pending':
            filteredTasks = taskStatus.filter(task => task.status === 'Pendente');
            reportTitle = `Relatório Tarefas Pendentes`;
            statusColor = '#dc3545';
            break;
        case 'normal':
            filteredTasks = taskStatus.filter(task => task.status === 'Normal');
            reportTitle = `Relatório Tarefas Normais`;
            statusColor = '#6c757d';
            break;
        default:
            filteredTasks = taskStatus;
            reportTitle = `Relatório Completo de Tarefas`;
    }
    
    // Aplicar filtro de busca se houver
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm !== '') {
        filteredTasks = filteredTasks.filter(task => 
            task.text.toLowerCase().includes(searchTerm) ||
            (task.observations && task.observations.toLowerCase().includes(searchTerm))
        );
    }
    
    // Cabeçalho principal com gradiente simulado
    doc.setFillColor(88, 124, 108);
    doc.rect(0, 0, 210, 50, 'F');
    
    // Linha decorativa no topo
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, 210, 3, 'F');
    
    // Logo/Título da empresa com sombra
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont('helvetica', 'bold');
    doc.text('CHECKLIST TIO PEPE', 20, 25);
    
    // Subtítulo com destaque
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(reportTitle, 20, 35);
    
    // Data e hora em caixa destacada
    doc.setFillColor(255, 255, 255);
    doc.rect(20, 38, 80, 8, 'F');
    doc.setTextColor(88, 124, 108);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`Data: ${currentDate} às ${currentTime}`, 22, 44);
    
    // Ícone decorativo (usando texto simples)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CHECKLIST', 180, 25);
    
    // Resetar cor
    doc.setTextColor(0, 0, 0);
    
    // Estatísticas do relatório
    const totalTasks = filteredTasks.length;
    const okCount = filteredTasks.filter(task => task.status === 'OK').length;
    const pendingCount = filteredTasks.filter(task => task.status === 'Pendente').length;
    const normalCount = filteredTasks.filter(task => task.status === 'Normal').length;
    const completionRate = totalTasks > 0 ? Math.round((okCount / totalTasks) * 100) : 0;
    
    // Caixa de estatísticas melhorada
    doc.setFillColor(248, 249, 250);
    doc.rect(20, 60, 170, 35, 'F');
    doc.setDrawColor(88, 124, 108);
    doc.setLineWidth(2);
    doc.rect(20, 60, 170, 35, 'S');
    
    // Título sem ícones problemáticos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(88, 124, 108);
    doc.text('ESTATISTICAS DO RELATORIO', 25, 70);
    
    // Linha separadora
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.line(25, 72, 185, 72);
    
    // Estatísticas em grid com layout melhorado
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    
    // Primeira linha - ajustar posicionamento
    doc.text(`Total: ${totalTasks}`, 25, 80);
    doc.text(`OK: ${okCount}`, 80, 80);
    doc.text(`Pendentes: ${pendingCount}`, 130, 80);
    doc.text(`Normais: ${normalCount}`, 170, 80);
    
    // Segunda linha
    doc.text(`Taxa: ${completionRate}%`, 25, 88);
    
    // Barra de progresso visual
    if (totalTasks > 0) {
        const progressWidth = (okCount / totalTasks) * 100;
        doc.setFillColor(220, 220, 220);
        doc.rect(25, 90, 100, 3, 'F');
        doc.setFillColor(40, 167, 69);
        doc.rect(25, 90, progressWidth, 3, 'F');
    }
    
    // Informações do filtro de busca
    if (searchTerm !== '') {
        doc.setFillColor(255, 248, 220);
        doc.rect(20, 100, 170, 12, 'F');
        doc.setDrawColor(255, 193, 7);
        doc.setLineWidth(1);
        doc.rect(20, 100, 170, 12, 'S');
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(133, 100, 4);
        doc.text(`Filtro aplicado: "${searchInput.value}"`, 25, 108);
        doc.setTextColor(0, 0, 0);
    }
    
    // Tabela de tarefas
    let yPosition = searchTerm !== '' ? 120 : 110;
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 12;
    const tableStartX = 20;
    const tableWidth = 170;
    
    // Definir larguras das colunas
    const taskColumnWidth = 60;
    const statusColumnWidth = 30;
    const obsColumnWidth = 80;
    
    // Cabeçalho da tabela melhorado
    doc.setFillColor(88, 124, 108);
    doc.rect(tableStartX, yPosition - 10, tableWidth, 10, 'F');
    
    // Linha decorativa no topo do cabeçalho
    doc.setFillColor(255, 255, 255);
    doc.rect(tableStartX, yPosition - 10, tableWidth, 2, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('TAREFA', tableStartX + 3, yPosition - 2);
    doc.text('STATUS', tableStartX + taskColumnWidth + 5, yPosition - 2);
    doc.text('OBSERVACOES', tableStartX + taskColumnWidth + statusColumnWidth + 10, yPosition - 2);
    
    yPosition += 5;
    
    // Conteúdo das tarefas
    if (filteredTasks.length === 0) {
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'italic');
        doc.text('Nenhuma tarefa encontrada com os filtros aplicados.', tableStartX + 2, yPosition);
    } else {
        filteredTasks.forEach((task, index) => {
            // Verificar se precisa de nova página
            if (yPosition > pageHeight - 40) {
                doc.addPage();
                yPosition = 30;
                
                // Repetir cabeçalho da tabela
                doc.setFillColor(88, 124, 108);
                doc.rect(tableStartX, yPosition - 10, tableWidth, 10, 'F');
                
                // Linha decorativa no topo do cabeçalho
                doc.setFillColor(255, 255, 255);
                doc.rect(tableStartX, yPosition - 10, tableWidth, 2, 'F');
                
                doc.setTextColor(255, 255, 255);
                doc.setFontSize(11);
                doc.setFont('helvetica', 'bold');
                doc.text('TAREFA', tableStartX + 3, yPosition - 2);
                doc.text('STATUS', tableStartX + taskColumnWidth + 5, yPosition - 2);
                doc.text('OBSERVACOES', tableStartX + taskColumnWidth + statusColumnWidth + 10, yPosition - 2);
                
                yPosition += 5;
            }
            
            // Linha da tarefa com fundo alternado e bordas
            if (index % 2 === 0) {
                doc.setFillColor(248, 249, 250);
                doc.rect(tableStartX, yPosition - 6, tableWidth, lineHeight, 'F');
            }
            
            // Borda lateral colorida baseada no status
            let borderColor = [200, 200, 200];
            switch (task.status) {
                case 'OK':
                    borderColor = [40, 167, 69];
                    break;
                case 'Pendente':
                    borderColor = [220, 53, 69];
                    break;
                case 'Normal':
                    borderColor = [108, 117, 125];
                    break;
            }
            
            doc.setDrawColor(borderColor[0], borderColor[1], borderColor[2]);
            doc.setLineWidth(3);
            doc.line(tableStartX, yPosition - 6, tableStartX, yPosition + 6);
            
            // Número da tarefa
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'bold');
            doc.text(`${index + 1}.`, tableStartX + 5, yPosition - 1);
            
            // Nome da tarefa
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            
            // Quebrar texto da tarefa se muito longo
            const taskText = task.text.length > 25 ? task.text.substring(0, 25) + '...' : task.text;
            doc.text(taskText, tableStartX + 15, yPosition);
            
            // Status com cor em caixa destacada
            doc.setFont('helvetica', 'bold');
            let statusText = task.status;
            let statusBgColor = [200, 200, 200];
            
            switch (task.status) {
                case 'OK':
                    doc.setTextColor(255, 255, 255);
                    statusBgColor = [40, 167, 69];
                    break;
                case 'Pendente':
                    doc.setTextColor(255, 255, 255);
                    statusBgColor = [220, 53, 69];
                    break;
                case 'Normal':
                    doc.setTextColor(255, 255, 255);
                    statusBgColor = [108, 117, 125];
                    break;
            }
            
            // Caixa de status posicionada corretamente
            const statusX = tableStartX + taskColumnWidth + 5;
            doc.setFillColor(statusBgColor[0], statusBgColor[1], statusBgColor[2]);
            doc.rect(statusX, yPosition - 4, statusColumnWidth, 8, 'F');
            doc.text(statusText, statusX + 2, yPosition);
            
            // Observações com espaço completo
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'normal');
            const observations = task.observations || '-';
            const obsX = tableStartX + taskColumnWidth + statusColumnWidth + 10;
            
            // Quebrar observações em múltiplas linhas se necessário
            const maxObsLength = 35; // Aumentado para acomodar mais texto
            if (observations.length > maxObsLength) {
                const words = observations.split(' ');
                let currentLine = '';
                let lineY = yPosition;
                
                for (let i = 0; i < words.length; i++) {
                    const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
                    if (testLine.length > maxObsLength && currentLine) {
                        doc.text(currentLine, obsX, lineY);
                        currentLine = words[i];
                        lineY += 4;
                    } else {
                        currentLine = testLine;
                    }
                }
                if (currentLine) {
                    doc.text(currentLine, obsX, lineY);
                }
            } else {
                doc.text(observations, obsX, yPosition);
            }
            
            yPosition += lineHeight;
        });
    }
    
    // Rodapé melhorado com informações da empresa
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Fundo do rodapé
        doc.setFillColor(248, 249, 250);
        doc.rect(0, pageHeight - 30, 210, 30, 'F');
        
        // Linha separadora do rodapé
        doc.setDrawColor(88, 124, 108);
        doc.setLineWidth(2);
        doc.line(20, pageHeight - 28, 190, pageHeight - 28);
        
        // Logo da empresa no rodapé
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(88, 124, 108);
        doc.text('CHECKLIST TIO PEPE', 20, pageHeight - 20);
        
        // Informações do rodapé
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100, 100, 100);
        doc.text(`Página ${i} de ${totalPages}`, 20, pageHeight - 12);
        doc.text(`Sistema de Gestão de Tarefas`, 120, pageHeight - 12);
        doc.text(`Gerado em: ${currentDate} às ${currentTime}`, 20, pageHeight - 5);
        doc.text(`Total: ${totalTasks} tarefas | Conclusão: ${completionRate}%`, 120, pageHeight - 5);
        
        // Linha decorativa no final
        doc.setDrawColor(200, 200, 200);
        doc.setLineWidth(0.5);
        doc.line(20, pageHeight - 2, 190, pageHeight - 2);
    }
    
    // Salvar o PDF
    const fileName = `checklist-tio-pepe-${reportType}-${currentDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
}

// Função para gerar relatório diário em nova página
function generateDailyReport() {
    // Filtrar apenas tarefas OK e Pendentes
    const dailyTasks = taskStatus.filter(task => 
        task.status === 'OK' || task.status === 'Pendente'
    );
    
    // Aplicar filtro de busca se houver
    const searchTerm = searchInput.value.toLowerCase().trim();
    let filteredTasks = dailyTasks;
    if (searchTerm !== '') {
        filteredTasks = dailyTasks.filter(task => 
            task.text.toLowerCase().includes(searchTerm) ||
            (task.observations && task.observations.toLowerCase().includes(searchTerm))
        );
    }
    
    // Criar HTML para a nova página
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const currentDate = `${day}/${month}/${year}`;
    const currentTime = now.toLocaleTimeString('pt-BR');
    
    const okTasks = filteredTasks.filter(task => task.status === 'OK');
    const pendingTasks = filteredTasks.filter(task => task.status === 'Pendente');
    
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Relatório Diário - Checklist Tio Pepe</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                padding: 20px;
            }
            
            .container {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }
            
            .header {
                background: linear-gradient(135deg, #587c6c, #4a6b5c);
                color: white;
                padding: 30px;
                text-align: center;
            }
            
            .header h1 {
                font-size: 2.5rem;
                margin-bottom: 10px;
                font-weight: 700;
            }
            
            .header .subtitle {
                font-size: 1.2rem;
                opacity: 0.9;
            }
            
            .date-info {
                background: rgba(255, 255, 255, 0.2);
                padding: 15px;
                border-radius: 10px;
                margin-top: 20px;
                display: inline-block;
            }
            
            .stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                padding: 30px;
                background: #f8f9fa;
            }
            
            .stat-card {
                background: white;
                padding: 25px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-left: 5px solid;
            }
            
            .stat-card.ok {
                border-left-color: #28a745;
            }
            
            .stat-card.pending {
                border-left-color: #f59e0b;
            }
            
            .stat-card.total {
                border-left-color: #587c6c;
            }
            
            .stat-number {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 10px;
            }
            
            .stat-label {
                font-size: 1.1rem;
                color: #666;
                font-weight: 500;
            }
            
            .tasks-section {
                padding: 30px;
            }
            
            .section-title {
                font-size: 1.8rem;
                margin-bottom: 20px;
                color: #333;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .section-title.ok {
                color: #28a745;
            }
            
            .section-title.pending {
                color: #f59e0b;
            }
            
            .tasks-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 20px;
                margin-bottom: 40px;
            }
            
            .task-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                border-left: 5px solid;
                transition: transform 0.3s ease;
            }
            
            .task-card:hover {
                transform: translateY(-5px);
            }
            
            .task-card.ok {
                border-left-color: #28a745;
                background: linear-gradient(135deg, #f0f9f0, #ffffff);
            }
            
            .task-card.pending {
                border-left-color: #f59e0b;
                background: linear-gradient(135deg, #fefce8, #ffffff);
            }
            
            .task-title {
                font-size: 1.1rem;
                font-weight: 600;
                margin-bottom: 10px;
                color: #333;
            }
            
            .task-status {
                display: inline-block;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 15px;
            }
            
            .task-status.ok {
                background: #28a745;
                color: white;
            }
            
            .task-status.pending {
                background: #f59e0b;
                color: white;
            }
            
            .task-observations {
                background: #f8f9fa;
                padding: 12px;
                border-radius: 8px;
                font-size: 0.9rem;
                color: #666;
                border-left: 3px solid #e9ecef;
            }
            
            .no-observations {
                color: #999;
                font-style: italic;
            }
            
            .footer {
                background: #f8f9fa;
                padding: 20px 30px;
                text-align: center;
                color: #666;
                border-top: 1px solid #e9ecef;
            }
            
            .print-btn {
                background: #587c6c;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                margin: 20px;
                transition: all 0.3s ease;
            }
            
            .print-btn:hover {
                background: #4a6b5c;
                transform: translateY(-2px);
            }
            
            @media (max-width: 768px) {
                .container {
                    margin: 10px;
                    border-radius: 12px;
                }
                
                .header {
                    padding: 20px;
                }
                
                .header h1 {
                    font-size: 2rem;
                }
                
                .stats {
                    grid-template-columns: 1fr;
                    padding: 20px;
                }
                
                .tasks-grid {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
                
                .tasks-section {
                    padding: 20px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 Relatório Diário</h1>
                <div class="subtitle">Checklist Tio Pepe</div>
                <div class="date-info">
                    <strong>Data:</strong> ${currentDate} às ${currentTime}
                </div>
            </div>
            
            <div class="stats">
                <div class="stat-card total">
                    <div class="stat-number">${filteredTasks.length}</div>
                    <div class="stat-label">Total de Tarefas</div>
                </div>
                <div class="stat-card ok">
                    <div class="stat-number">${okTasks.length}</div>
                    <div class="stat-label">Tarefas Concluídas (OK)</div>
                </div>
                <div class="stat-card pending">
                    <div class="stat-number">${pendingTasks.length}</div>
                    <div class="stat-label">Tarefas Pendentes</div>
                </div>
            </div>
            
            <div class="tasks-section">
                <h2 class="section-title ok">✅ Tarefas Concluídas (${okTasks.length})</h2>
                <div class="tasks-grid">
                    ${okTasks.length > 0 ? okTasks.map(task => `
                        <div class="task-card ok">
                            <div class="task-title">${task.text}</div>
                            <div class="task-status ok">OK</div>
                            <div class="task-observations">
                                ${task.observations ? task.observations : '<span class="no-observations">Sem observações</span>'}
                            </div>
                        </div>
                    `).join('') : '<p style="grid-column: 1/-1; text-align: center; color: #666; font-style: italic; padding: 40px;">Nenhuma tarefa concluída hoje</p>'}
                </div>
                
                <h2 class="section-title pending">⏳ Tarefas Pendentes (${pendingTasks.length})</h2>
                <div class="tasks-grid">
                    ${pendingTasks.length > 0 ? pendingTasks.map(task => `
                        <div class="task-card pending">
                            <div class="task-title">${task.text}</div>
                            <div class="task-status pending">Pendente</div>
                            <div class="task-observations">
                                ${task.observations ? task.observations : '<span class="no-observations">Sem observações</span>'}
                            </div>
                        </div>
                    `).join('') : '<p style="grid-column: 1/-1; text-align: center; color: #666; font-style: italic; padding: 40px;">Nenhuma tarefa pendente hoje</p>'}
                </div>
            </div>
            
            <div class="footer">
                <button class="print-btn" onclick="window.print()">🖨️ Imprimir Relatório</button>
                <p>Relatório gerado automaticamente pelo Sistema de Checklist Tio Pepe</p>
            </div>
        </div>
    </body>
    </html>
    `;
    
    // Abrir nova janela com o relatório
    const newWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    newWindow.document.write(htmlContent);
    newWindow.document.close();
}

// Event listeners para relatórios
generateDailyReportBtn.addEventListener('click', generateDailyReport);
generateReportAllBtn.addEventListener('click', () => generatePDFReport('all'));
generateReportNormalBtn.addEventListener('click', () => generatePDFReport('normal'));
generateReportOkBtn.addEventListener('click', () => generatePDFReport('ok'));
generateReportPendingBtn.addEventListener('click', () => generatePDFReport('pending'));

// Event listeners para busca
searchInput.addEventListener('input', function() {
    updateClearButton();
    renderTasks();
});

searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Escape') {
        clearSearch();
    }
});

clearSearchBtn.addEventListener('click', clearSearch);

// Event listeners para filtros de status
filterAllBtn.addEventListener('click', () => updateStatusFilter('all'));
filterNormalBtn.addEventListener('click', () => updateStatusFilter('Normal'));
filterPendingBtn.addEventListener('click', () => updateStatusFilter('Pendente'));
filterOkBtn.addEventListener('click', () => updateStatusFilter('OK'));

// Event listeners do menu
menuToggleBtn.addEventListener('click', toggleMenu);

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!menuToggleBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
        closeMenu();
    }
});

// Event listeners para opções do menu de relatórios
document.getElementById('menu-daily-report').addEventListener('click', () => {
    generateDailyReport();
    closeMenu();
});

document.getElementById('menu-report-all').addEventListener('click', () => {
    generatePDFReport('all');
    closeMenu();
});

document.getElementById('menu-report-normal').addEventListener('click', () => {
    generatePDFReport('normal');
    closeMenu();
});

document.getElementById('menu-report-ok').addEventListener('click', () => {
    generatePDFReport('ok');
    closeMenu();
});

document.getElementById('menu-report-pending').addEventListener('click', () => {
    generatePDFReport('pending');
    closeMenu();
});

// Event listeners da calculadora
calculatorBtn.addEventListener('click', openCalculator);
closeCalculatorBtn.addEventListener('click', closeCalculator);

// Fechar modal ao clicar fora
calculatorModal.addEventListener('click', (e) => {
    if (e.target === calculatorModal) {
        closeCalculator();
    }
});

// Event listeners dos botões da calculadora
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('calc-number')) {
        inputNumber(e.target.textContent);
    } else if (e.target.classList.contains('calc-operator')) {
        performOperation(e.target.dataset.op);
    } else if (e.target.classList.contains('calc-equals')) {
        calculateResult();
    } else if (e.target.classList.contains('calc-clear')) {
        if (e.target.textContent === 'C') {
            clearCalculator();
        } else {
            clearEntry();
        }
    } else if (e.target.classList.contains('calc-function')) {
        performFunction(e.target.dataset.op);
    } else if (e.target.textContent === '.') {
        inputDecimal();
    }
});

// Event listener para teclado
document.addEventListener('keydown', handleKeyboardInput);

// Variáveis da calculadora avançada
let calculatorState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    history: '',
    memory: 0,
    lastOperation: null
};

// Funções da calculadora avançada
function updateCalculatorDisplay() {
    calcDisplay.value = calculatorState.display;
    calcHistory.textContent = calculatorState.history;
}

function formatNumber(num) {
    if (num === null || num === undefined) return '0';
    
    // Limitar casas decimais para evitar números muito longos
    const rounded = Math.round(num * 100000000) / 100000000;
    
    // Formatar números muito grandes ou muito pequenos
    if (Math.abs(rounded) >= 1e15) {
        return rounded.toExponential(6);
    }
    
    return rounded.toString();
}

function inputNumber(num) {
    if (calculatorState.waitingForNewValue) {
        calculatorState.display = num;
        calculatorState.waitingForNewValue = false;
    } else {
        if (calculatorState.display === '0') {
            calculatorState.display = num;
        } else if (calculatorState.display.length < 15) { // Limitar tamanho
            calculatorState.display += num;
        }
    }
    updateCalculatorDisplay();
}

function inputDecimal() {
    if (calculatorState.waitingForNewValue) {
        calculatorState.display = '0.';
        calculatorState.waitingForNewValue = false;
    } else if (calculatorState.display.indexOf('.') === -1) {
        calculatorState.display += '.';
    }
    updateCalculatorDisplay();
}

function performOperation(nextOperation) {
    const inputValue = parseFloat(calculatorState.display);
    
    if (calculatorState.previousValue === null) {
        calculatorState.previousValue = inputValue;
        calculatorState.history = formatNumber(inputValue) + ' ' + nextOperation;
    } else if (calculatorState.operation) {
        const currentValue = calculatorState.previousValue || 0;
        const newValue = calculate(currentValue, inputValue, calculatorState.operation);
        
        calculatorState.display = formatNumber(newValue);
        calculatorState.previousValue = newValue;
        calculatorState.history = formatNumber(newValue) + ' ' + nextOperation;
        updateCalculatorDisplay();
    } else {
        calculatorState.history = formatNumber(inputValue) + ' ' + nextOperation;
    }
    
    calculatorState.waitingForNewValue = true;
    calculatorState.operation = nextOperation;
    calculatorState.lastOperation = nextOperation;
}

function calculate(firstValue, secondValue, operation) {
    switch (operation) {
        case '+':
            return firstValue + secondValue;
        case '-':
            return firstValue - secondValue;
        case '×':
            return firstValue * secondValue;
        case '÷':
            return secondValue !== 0 ? firstValue / secondValue : 0;
        case '^':
        case 'power':
            return Math.pow(firstValue, secondValue);
        case '%':
            return (firstValue * secondValue) / 100;
        default:
            return secondValue;
    }
}

function performFunction(func) {
    const currentValue = parseFloat(calculatorState.display);
    let result;
    
    switch (func) {
        case 'sqrt':
            result = currentValue >= 0 ? Math.sqrt(currentValue) : 0;
            calculatorState.history = '√(' + formatNumber(currentValue) + ')';
            break;
        case 'square':
            result = currentValue * currentValue;
            calculatorState.history = '(' + formatNumber(currentValue) + ')²';
            break;
        case 'power':
            if (calculatorState.previousValue !== null) {
                result = Math.pow(calculatorState.previousValue, currentValue);
                calculatorState.history = formatNumber(calculatorState.previousValue) + '^' + formatNumber(currentValue);
                calculatorState.previousValue = null;
            } else {
                calculatorState.previousValue = currentValue;
                calculatorState.history = formatNumber(currentValue) + '^';
                calculatorState.waitingForNewValue = true;
                updateCalculatorDisplay();
                return;
            }
            break;
        case 'percent':
            result = currentValue / 100;
            calculatorState.history = formatNumber(currentValue) + '%';
            break;
        case 'plusminus':
            result = -currentValue;
            calculatorState.history = '±(' + formatNumber(currentValue) + ')';
            break;
        case 'backspace':
            if (calculatorState.display.length > 1) {
                calculatorState.display = calculatorState.display.slice(0, -1);
            } else {
                calculatorState.display = '0';
            }
            updateCalculatorDisplay();
            return;
        default:
            return;
    }
    
    calculatorState.display = formatNumber(result);
    calculatorState.waitingForNewValue = true;
    updateCalculatorDisplay();
}

function clearCalculator() {
    calculatorState.display = '0';
    calculatorState.previousValue = null;
    calculatorState.operation = null;
    calculatorState.waitingForNewValue = false;
    calculatorState.history = '';
    calculatorState.lastOperation = null;
    updateCalculatorDisplay();
}

function clearEntry() {
    calculatorState.display = '0';
    updateCalculatorDisplay();
}

function calculateResult() {
    const inputValue = parseFloat(calculatorState.display);
    
    if (calculatorState.previousValue !== null && calculatorState.operation) {
        const newValue = calculate(calculatorState.previousValue, inputValue, calculatorState.operation);
        calculatorState.history = calculatorState.history + ' ' + formatNumber(inputValue) + ' =';
        calculatorState.display = formatNumber(newValue);
        calculatorState.previousValue = null;
        calculatorState.operation = null;
        calculatorState.waitingForNewValue = true;
        updateCalculatorDisplay();
    }
}

// Suporte ao teclado
function handleKeyboardInput(e) {
    if (!calculatorModal.classList.contains('show')) return;
    
    const key = e.key;
    
    if (key >= '0' && key <= '9') {
        inputNumber(key);
    } else if (key === '.') {
        inputDecimal();
    } else if (key === '+') {
        performOperation('+');
    } else if (key === '-') {
        performOperation('-');
    } else if (key === '*') {
        performOperation('×');
    } else if (key === '/') {
        e.preventDefault();
        performOperation('÷');
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape') {
        clearCalculator();
    } else if (key === 'Backspace') {
        performFunction('backspace');
    }
}

// Funções do menu
function toggleMenu() {
    menuDropdown.classList.toggle('show');
}

function closeMenu() {
    menuDropdown.classList.remove('show');
}

function openCalculator() {
    calculatorModal.classList.add('show');
    closeMenu();
}

function closeCalculator() {
    calculatorModal.classList.remove('show');
}

// Inicialização
function initializeApp() {
    // Mapear tarefas para o array de status
    taskStatus = TASKS.map(task => ({
        text: task,
        status: 'Normal',
        observations: ''
    }));
    
    // Renderizar tarefas pela primeira vez
    renderTasks();
    
    // Inicializar calculadora
    updateCalculatorDisplay();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initializeApp);
