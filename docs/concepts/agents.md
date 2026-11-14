# Agentes e execução determinística

Fundamentos introduzidos no M1 (Visão conceitual do sistema).

Um modelo de IA recebe informações e pode produzir respostas ou indicar ações.
Uma ferramenta é uma função disponibilizada ao sistema para realizar uma ação,
como consultar dados. Em um agente com IA, o modelo pode participar da escolha
das próximas ações e das ferramentas, dentro dos limites definidos pelo sistema.

Um executor coordena o trabalho: realiza etapas, acompanha seus estados e registra
resultados. Ele pode seguir uma sequência e regras programadas, sem usar IA.
Concluir a requisição que inicia um trabalho não significa concluir a execução
desse trabalho no servidor.

O simulador do projeto usará regras e sequência predefinidas, sem modelo de IA.
Permitirá estudar execução, etapas, evidências, acompanhamento e revisão humana.
Seu fluxo específico está na [visão do sistema](../system/overview.md).

## Progresso, evidências e revisão

Progresso informa o andamento do trabalho, como uma etapa concluída. Evidências
registram dados considerados e resultados que sustentam uma conclusão. Em nosso
fluxo determinístico, podem ser valores de entrada, cálculo realizado e limite
aplicado pela regra; não representam raciocínio de um modelo de IA.

Recomendação é a sugestão produzida pelo sistema. Decisão humana é o registro da
escolha da pessoa revisora, com justificativa, e pode discordar da recomendação.
Manter os dois registros separados permite compreender o resultado do sistema e
a intervenção humana. Uma execução concluída pode continuar aguardando revisão.
