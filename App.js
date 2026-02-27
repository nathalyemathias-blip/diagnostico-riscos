import { useState, useEffect } from "react";

const MODS = [
  {
    id:1, titulo:"Contratação e Onboarding",
    desc:"A fase de contratação é onde os riscos trabalhistas têm origem. Erros na formalização do vínculo, documentação incompleta e ambiguidade sobre cargo e remuneração criam fragilidades exploráveis em reclamações futuras.",
    alerta:{tipo:"warn",txt:"💡 Atenção especial",msg:"Promessas verbais de promoção, aumento salarial ou benefícios feitas durante o processo seletivo e não documentadas são uma das causas mais comuns de reclamações por diferenças salariais e dano moral."},
    itens:[
      "Registro em CTPS realizado até o 1º dia de trabalho efetivo",
      "Evento de admissão no eSocial (S-2200) enviado até D-1 em relação ao início das atividades",
      "Contrato de trabalho assinado antes do início das atividades, especificando: cargo, função, salário, jornada e local",
      "Ficha de admissão preenchida e assinada pelo colaborador",
      "Exame admissional (ASO) realizado antes do início das atividades",
      "Entrega de Regulamento Interno / Manual do Colaborador com protocolo de recebimento assinado",
      "Termo de confidencialidade assinado quando o colaborador terá acesso a informações estratégicas",
      "Cláusula de não concorrência aplicada apenas quando proporcional ao cargo, com prazo, abrangência e contraprestação definidos",
      "Colaborador informado sobre benefícios de forma escrita e documentada",
      "Definição clara se o contrato é CLT, PJ, temporário, estagiário ou aprendiz",
      "Cópia dos documentos admissionais arquivada (físico ou digital com backup)",
      "Ausência de promessas verbais não documentadas (cargo, salário, benefícios futuros)",
    ]
  },
  {
    id:2, titulo:"Jornada e Controle de Ponto",
    desc:"O controle de jornada é uma das áreas com maior volume de reclamações trabalhistas no Brasil. Horas extras não pagas, banco de horas irregular e ausência de registros são os principais vetores de risco.",
    alerta:{tipo:"warn",txt:"💡 Home Office e Disponibilidade Digital",msg:"A ausência de política formal sobre disponibilidade digital (WhatsApp, e-mail noturno, mensagens no fim de semana) pode configurar horas extras não remuneradas. Formalize as regras em aditivo contratual ou política interna assinada."},
    itens:[
      "Sistema de controle de ponto ativo (eletrônico, mecânico ou manual)",
      "Registros de ponto consistentes, sem alterações unilaterais sem justificativa documentada",
      "Intervalo intrajornada de no mínimo 1h respeitado e registrado para jornadas acima de 6h",
      "Horas extras formalizadas: autorizadas por escrito ou refletidas na folha de pagamento",
      "Banco de horas com Acordo Individual ou Coletivo vigente e arquivado",
      "Banco de horas compensado ou pago dentro do prazo previsto em lei",
      "Trabalho em finais de semana e feriados com folga compensatória ou adicional documentados",
      "Política de home office / trabalho remoto formalizada em aditivo contratual",
      "Colaboradores em home office com controle de jornada definido e registrado",
      "Cargos com função de confiança isentos de ponto devidamente caracterizados por escrito",
      "Ausência de acionamentos fora do horário sem política clara de compensação",
      "Registros de ponto arquivados por prazo mínimo de 5 anos",
    ]
  },
  {
    id:3, titulo:"Remuneração e Benefícios",
    desc:"Divergências sobre salário, comissões, equiparação salarial e benefícios figuram entre as reclamações mais frequentes. A documentação precisa e sistemática é a principal defesa da empresa.",
    alerta:{tipo:"warn",txt:"💡 Desvio de Função",msg:"O desvio de função ocorre quando o colaborador exerce atividades superiores às descritas no contrato, sem a devida adequação salarial. Revise a descrição de cargo a cada mudança real de função."},
    itens:[
      "Holerite emitido mensalmente e disponibilizado ao colaborador com protocolo de entrega",
      "Todos os componentes da remuneração descritos no contrato ou em documento específico",
      "Comissões e variáveis com critérios documentados, aprovados e comunicados por escrito",
      "Política de metas com metodologia de cálculo documentada e acessível ao colaborador",
      "Ausência de situações de desvio de função sem ajuste salarial correspondente",
      "Verificação periódica de equiparação salarial entre cargos iguais ou equivalentes",
      "Vale alimentação/refeição fornecido conforme o contrato e convenção coletiva",
      "Plano de saúde com documentação de cobertura entregue ao colaborador",
      "Vale transporte com comprovante de solicitação e autorização do colaborador",
      "13º salário pago nas datas legais com documentação de cálculo",
      "Férias gozadas e pagas dentro do período concessivo, com aviso antecipado de 30 dias",
      "Adicionais previstos em lei ou convenção (noturno, insalubridade, periculosidade) aplicados corretamente",
      "Política de PLR/PPR com critérios documentados e homologados (quando aplicável)",
    ]
  },
  {
    id:4, titulo:"Relação CLT × PJ — Risco de Vínculo",
    desc:"Este é o módulo de maior risco estratégico para empresas que contratam prestadores PJ. A caracterização de vínculo empregatício pode gerar condenações com verbas rescisórias integrais retroativas. Se não há contratações PJ, marque todos os itens como N/A.",
    alerta:{tipo:"danger",txt:"🚨 ALERTA — Pejotização irregular",msg:"Se qualquer item for marcado como Vermelho, acione imediatamente o jurídico da empresa. A pejotização ilícita representa o maior risco de passivo trabalhista e não deve ser regularizada sem orientação especializada."},
    itens:[
      "Contrato de prestação de serviços PJ com cláusulas claras de autonomia e independência",
      "O prestador pode ser substituído por outro profissional sem autorização da empresa (não pessoalidade)",
      "O prestador define seus próprios horários e local de trabalho (ausência de controle de jornada)",
      "Ausência de subordinação direta: o PJ não recebe ordens sobre COMO executar, apenas sobre o RESULTADO",
      "O prestador presta serviços para outros clientes além da empresa (ausência de exclusividade)",
      "Emissão regular de Nota Fiscal pelo prestador com tributação adequada",
      "O prestador não participa de reuniões internas obrigatórias como empregado",
      "O prestador não utiliza uniforme, crachá ou e-mail institucional sem ressalvas contratuais",
      "O prestador possui CNPJ ativo com objeto social compatível com os serviços prestados",
      "Remuneração paga por entrega ou projeto, não por presença ou carga horária fixa",
      "Contrato PJ revisado periodicamente por advogado trabalhista",
      "Empresa monitora e documenta a autonomia real do prestador (e-mails, registros de entrega)",
      "Ausência de promessas de conversão CLT feitas informalmente ao PJ",
    ]
  },
  {
    id:5, titulo:"Gestão de Desempenho e Advertências",
    desc:"A ausência de registros sobre gestão de desempenho é um dos maiores problemas em demissões por justa causa revertidas. Advertências sem protocolo, metas não documentadas e feedbacks apenas verbais tornam a empresa vulnerável.",
    alerta:{tipo:"info",txt:"💡 Advertências sem assinatura",msg:"Quando o colaborador se recusa a assinar, registre a recusa com 2 testemunhas: 'O colaborador [nome] recusou-se a assinar, na presença de [testemunha 1] e [testemunha 2]'. Isso confere validade jurídica ao documento."},
    itens:[
      "Advertências formalizadas por escrito com descrição clara do fato e fundamentação",
      "Entrega de advertências com protocolo do colaborador (assinatura ou testemunhas em caso de recusa)",
      "Suspensões registradas em livro de registro de empregados e na folha de pagamento",
      "Processo de demissão por justa causa com parecer jurídico prévio",
      "Metas de desempenho estabelecidas por escrito e comunicadas formalmente",
      "Avaliações de desempenho periódicas documentadas e assinadas pelo colaborador",
      "Feedbacks críticos registrados (por e-mail, sistema ou formulário) e não apenas verbais",
      "PIP (Plano de Melhoria de Desempenho) com prazos, critérios e suporte documentados, assinado pelo colaborador",
      "Gradação de penalidades aplicada: advertência verbal → escrita → suspensão → justa causa",
      "Dossiê do colaborador organizado com histórico de ocorrências documentadas",
      "Ausência de demissões com causa real não documentada — todo desligamento motivado possui histórico que o sustente",
    ]
  },
  {
    id:6, titulo:"Saúde, Segurança e Assédio",
    desc:"Processos por dano moral, assédio moral ou sexual e acidente de trabalho estão entre as condenações de maior valor nas Varas do Trabalho. A prevenção nessa área é tanto ética quanto estratégica.",
    alerta:{tipo:"info",txt:"💡 Canal de denúncia",msg:"A existência de um canal formal de denúncia serve como prova de que a empresa adotou medidas preventivas. Sua ausência pode ser interpretada como omissão intencional em casos de assédio, aumentando o valor das condenações."},
    itens:[
      "PCMSO (Programa de Controle Médico de Saúde Ocupacional) elaborado e vigente",
      "PGR (Programa de Gerenciamento de Riscos) em vigor",
      "ASO (Atestado de Saúde Ocupacional) realizado: admissional, periódico, retorno e demissional",
      "CIPA constituída quando exigida pelo número de colaboradores e atividade da empresa",
      "EPIs fornecidos e com comprovante de recebimento assinado pelo colaborador",
      "Treinamentos de saúde e segurança realizados com lista de presença arquivada",
      "Política de prevenção ao assédio moral e sexual publicada e de conhecimento de todos",
      "Canal de denúncia de assédio ativo, acessível e com garantia de anonimato",
      "Procedimento interno de investigação de denúncias documentado",
      "Código de Conduta publicado e assinado por todos os colaboradores",
      "Registro e investigação de acidentes de trabalho documentados e comunicados ao INSS (CAT)",
      "Ausência de histórico de queixas não investigadas ou arquivadas sem resposta formal",
      "Gestores treinados para identificar e agir sobre situações de assédio e conflito",
    ]
  },
  {
    id:7, titulo:"Rescisão e Offboarding",
    desc:"A fase de rescisão concentra grande parte das reclamações trabalhistas. Prazos não cumpridos, verbas incorretas e documentação incompleta são erros evitáveis com um processo de offboarding estruturado.",
    alerta:{tipo:"warn",txt:"💡 Consistência do motivo da rescisão",msg:"A inconsistência entre o tipo de rescisão registrado e o motivo real é facilmente identificada em processo trabalhista e cria presunção de má-fé. Certifique-se de que o motivo interno é consistente com o tipo de rescisão formal."},
    itens:[
      "Aviso prévio comunicado por escrito com protocolo de recebimento",
      "Verbas rescisórias calculadas e pagas no prazo de 10 dias corridos após o último dia do aviso",
      "Prazo contado a partir do último dia de trabalho efetivo (inclusive em caso de aviso indenizado)",
      "Cálculo rescisório revisado antes do pagamento (férias proporcionais, 13º, FGTS, multas)",
      "Guias de FGTS e INSS geradas e pagas corretamente na rescisão",
      "Termo de rescisão (TRCT) assinado pelo colaborador com cópia entregue a ele",
      "Baixa na CTPS realizada no prazo legal",
      "Documentos do INSS entregues ao colaborador",
      "Entrevista de desligamento realizada e documentada (não aplicável em rescisões por justa causa)",
      "Devolução de equipamentos e revogação de todos os acessos digitais e físicos documentadas",
      "Ausência de pagamentos extras ou ajustes feitos fora do TRCT",
      "Dossiê completo do ex-colaborador arquivado por mínimo de 5 anos",
      "Motivo real da demissão documentado internamente e consistente com o tipo de rescisão registrado",
    ]
  }
];

const STATUS = [
  { key:"v", emoji:"🟢", label:"Verde",    cls:"bg-green-50 text-green-800 border-green-300" },
  { key:"a", emoji:"🟡", label:"Amarelo",  cls:"bg-yellow-50 text-yellow-800 border-yellow-300" },
  { key:"r", emoji:"🔴", label:"Vermelho", cls:"bg-red-50 text-red-800 border-red-300" },
  { key:"n", emoji:"⬜", label:"N/A",      cls:"bg-slate-100 text-slate-600 border-slate-300" },
];

const ALERT_CLS = {
  info:   "bg-blue-50 border-blue-400 text-blue-900",
  warn:   "bg-yellow-50 border-yellow-400 text-yellow-900",
  danger: "bg-red-50 border-red-500 text-red-900",
};

function calcScore(respostas, modId) {
  const r = respostas[modId] || {};
  let v = 0, t = 0;
  Object.values(r).forEach(x => { if (!x || x === "n") return; t++; if (x === "v") v++; });
  return t === 0 ? null : Math.round((v / t) * 100);
}

function nivel(s) { return s >= 71 ? "v" : s >= 41 ? "a" : "r"; }

const NIVEL_STYLE = {
  v: { pill:"bg-green-100 text-green-800",  bar:"bg-green-500",  txt:"text-green-700",  label:"🟢 Conformidade" },
  a: { pill:"bg-yellow-100 text-yellow-800",bar:"bg-yellow-400", txt:"text-yellow-700", label:"🟡 Atenção" },
  r: { pill:"bg-red-100 text-red-800",      bar:"bg-red-500",    txt:"text-red-700",    label:"🔴 Crítico" },
};

export default function App() {
  const totalItens = MODS.reduce((s, m) => s + m.itens.length, 0);
  const [respostas, setRespostas] = useState(() => {
    const r = {};
    MODS.forEach(m => { r[m.id] = {}; m.itens.forEach((_, i) => r[m.id][i] = null); });
    return r;
  });
  const [abertos, setAbertos] = useState({ 1: true });
  const [empresa, setEmpresa] = useState({ razao:"", cnpj:"", resp:"", cargo:"" });
  const [relatorio, setRelatorio] = useState(null);
  const [tela, setTela] = useState("form"); // "form" | "relatorio"

  const respondidos = Object.values(respostas).reduce((s, m) =>
    s + Object.values(m).filter(x => x !== null).length, 0);
  const pct = Math.round((respondidos / totalItens) * 100);

  function setStatus(modId, idx, key) {
    setRespostas(prev => ({
      ...prev,
      [modId]: { ...prev[modId], [idx]: prev[modId][idx] === key ? null : key }
    }));
  }

  function toggleMod(id) {
    setAbertos(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function gerar() {
    let soma = 0, avaliados = 0, tv = 0, ta = 0, tr = 0;
    const scores = {};
    MODS.forEach(m => {
      const s = calcScore(respostas, m.id);
      scores[m.id] = s;
      if (s !== null) { soma += s; avaliados++; }
      Object.values(respostas[m.id]).forEach(x => {
        if (x === "v") tv++; else if (x === "a") ta++; else if (x === "r") tr++;
      });
    });
    const geral = avaliados > 0 ? Math.round(soma / avaliados) : 0;
    const criticos = [];
    MODS.forEach(m => m.itens.forEach((txt, i) => {
      const x = respostas[m.id][i];
      if (x === "r") criticos.push({ mod: m.titulo, txt, p: 1 });
      else if (x === "a") criticos.push({ mod: m.titulo, txt, p: 2 });
    }));
    setRelatorio({ scores, geral, soma, avaliados, tv, ta, tr, criticos });
    setTela("relatorio");
  }

  if (tela === "relatorio" && relatorio) {
    const { scores, geral, soma, avaliados, tv, ta, tr, criticos } = relatorio;
    const ng = nivel(geral);
    const ns = NIVEL_STYLE[ng];
    const hoje = new Date().toLocaleDateString("pt-BR");
    const interps = {
      r: "A empresa está em situação de alta exposição ao passivo trabalhista. Recomenda-se acionar imediatamente o jurídico e iniciar o plano de ação com foco nos itens VERMELHO. Cada item crítico sem resolução representa risco financeiro e jurídico imediato.",
      a: "Existem lacunas significativas que aumentam o risco de reclamações trabalhistas. O plano de ação deve ser iniciado em 30 dias, priorizando os módulos com menor score. Avalie a necessidade de acionar o jurídico para os itens críticos.",
      v: "A empresa possui um nível satisfatório de conformidade administrativa. O foco deve ser na eliminação dos itens amarelos remanescentes e na criação de rotinas de revisão periódica a cada 6 meses.",
    };
    return (
      <div style={{fontFamily:"system-ui,sans-serif",background:"#f1f5f9",minHeight:"100vh",padding:"12px"}}>
        {/* Cabeçalho relatório */}
        <div style={{background:"linear-gradient(135deg,#0f2744,#1a4a8a)",borderRadius:14,padding:"28px 20px",textAlign:"center",marginBottom:14}}>
          <div style={{fontSize:13,color:"rgba(255,255,255,.6)",marginBottom:6}}>Relatório de Diagnóstico Trabalhista</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.5)",marginBottom:4}}>{empresa.razao||"Empresa"} · {empresa.resp||"Responsável"} · {hoje}</div>
          <div style={{fontSize:64,fontWeight:700,color:"#fff",lineHeight:1,margin:"16px 0 8px"}}>{geral}%</div>
          <span style={{display:"inline-block",padding:"6px 18px",borderRadius:30,fontSize:13,fontWeight:700}} className={ns.pill}>{ns.label}</span>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>
          {[{n:tv,l:"🟢 Conformes",c:"#166534"},{n:ta,l:"🟡 Atenção",c:"#d97706"},{n:tr,l:"🔴 Críticos",c:"#991b1b"}].map((s,i)=>(
            <div key={i} style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",padding:"14px 8px",textAlign:"center"}}>
              <div style={{fontSize:30,fontWeight:700,color:s.c,lineHeight:1,marginBottom:4}}>{s.n}</div>
              <div style={{fontSize:11,color:"#64748b"}}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Score por módulo */}
        <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",overflow:"hidden",marginBottom:14}}>
          <div style={{padding:"12px 16px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:.5}}>Score por Módulo</div>
          <div style={{padding:"4px 16px"}}>
            {MODS.map(m => {
              const s = scores[m.id];
              if (s === null) return (
                <div key={m.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:"1px solid #f1f5f9"}}>
                  <div style={{flex:1,fontSize:13,color:"#1e293b"}}>Módulo {m.id} — {m.titulo}</div>
                  <span style={{fontSize:12,color:"#94a3b8"}}>N/A</span>
                </div>
              );
              const nv = nivel(s); const nvs = NIVEL_STYLE[nv];
              return (
                <div key={m.id} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 0",borderBottom:"1px solid #f1f5f9",flexWrap:"wrap"}}>
                  <div style={{flex:1,minWidth:120,fontSize:13,color:"#1e293b"}}>Módulo {m.id} — {m.titulo}</div>
                  <div style={{width:70,height:5,background:"#e2e8f0",borderRadius:10,overflow:"hidden",flexShrink:0}}>
                    <div style={{height:"100%",borderRadius:10,width:`${s}%`}} className={nvs.bar}/>
                  </div>
                  <div style={{fontSize:13,fontWeight:700,minWidth:32,textAlign:"right"}} className={nvs.txt}>{s}%</div>
                  <span style={{fontSize:11,fontWeight:600,padding:"2px 8px",borderRadius:20}} className={nvs.pill}>{nvs.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Fórmula */}
        <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",marginBottom:14,overflow:"hidden"}}>
          <div style={{padding:"12px 16px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",fontSize:12,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:.5}}>Cálculo do Score Geral</div>
          <div style={{padding:"14px 16px",fontSize:13,lineHeight:1.7,color:"#334155"}}>
            <b>Fórmula:</b> Soma dos scores ÷ Módulos avaliados<br/>
            <span style={{color:"#94a3b8"}}>{soma} ÷ {avaliados} = <b>{geral}%</b></span><br/><br/>
            <b>Régua:</b> 🔴 0–40% Crítico &nbsp;|&nbsp; 🟡 41–70% Atenção &nbsp;|&nbsp; 🟢 71–100% Conforme
          </div>
        </div>

        {/* Interpretação */}
        <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",padding:"18px 16px",marginBottom:14}}>
          <div style={{fontWeight:700,fontSize:16,color:"#0f2744",marginBottom:10}}>Interpretação do Resultado</div>
          <div style={{fontSize:14,lineHeight:1.65,color:"#334155"}}>{interps[ng]}</div>
        </div>

        {/* Plano de ação */}
        {criticos.length > 0 ? (
          <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",overflow:"hidden",marginBottom:14}}>
            <div style={{padding:"14px 16px",background:"#0f2744",color:"#fff",fontSize:13,fontWeight:600}}>
              🎯 Plano de Ação Priorizado — {criticos.length} item(ns) a resolver
            </div>
            {criticos.map((a, i) => (
              <div key={i} style={{display:"flex",gap:10,padding:"12px 16px",borderBottom:"1px solid #f1f5f9",alignItems:"flex-start"}}>
                <div style={{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:2,background:a.p===1?"#fee2e2":"#fef3c7",color:a.p===1?"#991b1b":"#92400e"}}>{i+1}</div>
                <div>
                  <div style={{fontSize:11,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:.5,marginBottom:3}}>
                    {a.p===1?"🔴 Crítico":"🟡 Atenção"} — {a.mod}
                  </div>
                  <div style={{fontSize:13,lineHeight:1.5,color:"#1e293b"}}>{a.txt}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{background:"#dcfce7",border:"1px solid #86efac",borderRadius:12,padding:16,marginBottom:14,fontSize:14,color:"#166534"}}>
            ✅ <b>Parabéns!</b> Nenhum item crítico ou de atenção identificado.
          </div>
        )}

        {/* Aviso */}
        <div style={{background:"#fffbeb",border:"1px solid #fcd34d",borderRadius:12,padding:16,marginBottom:16,fontSize:13,color:"#78350f",lineHeight:1.6}}>
          ⚖️ <b>Este relatório não substitui assessoria jurídica trabalhista.</b> É uma ferramenta de gestão administrativa preventiva. Situações críticas — especialmente do Módulo 4 — devem ser encaminhadas ao departamento jurídico. Reaplique o diagnóstico a cada 6 meses.
        </div>

        <button onClick={()=>setTela("form")} style={{width:"100%",background:"#fff",border:"2px solid #0f2744",color:"#0f2744",borderRadius:12,padding:"13px",fontSize:14,fontWeight:600,cursor:"pointer"}}>
          ← Voltar ao Diagnóstico
        </button>
      </div>
    );
  }

  return (
    <div style={{fontFamily:"system-ui,sans-serif",background:"#f1f5f9",minHeight:"100vh"}}>
      {/* Hero */}
      <div style={{background:"linear-gradient(150deg,#0f2744,#1a4a8a)",padding:"32px 16px 48px",textAlign:"center"}}>
        <div style={{display:"inline-block",background:"rgba(201,168,76,.2)",border:"1px solid rgba(201,168,76,.4)",color:"#f0c96e",fontSize:10,fontWeight:600,letterSpacing:2,textTransform:"uppercase",padding:"5px 14px",borderRadius:20,marginBottom:14}}>
          Ferramenta de Gestão Preventiva
        </div>
        <h1 style={{fontSize:"clamp(20px,6vw,38px)",fontWeight:700,color:"#fff",lineHeight:1.2,marginBottom:10}}>
          Diagnóstico de Riscos<br/><span style={{color:"#f0c96e"}}>Administrativos Trabalhistas</span>
        </h1>
        <p style={{color:"rgba(255,255,255,.65)",fontSize:13,maxWidth:500,margin:"0 auto 20px"}}>
          Levantamento estruturado para identificação de vulnerabilidades que potencializam reclamações trabalhistas — CLT e PJ.
        </p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:6}}>
          {["📋 7 módulos","✅ 84 itens","📊 Score automático","⚖️ Âmbito administrativo"].map(p=>(
            <span key={p} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.18)",color:"rgba(255,255,255,.85)",fontSize:11,padding:"4px 10px",borderRadius:20}}>{p}</span>
          ))}
        </div>
      </div>

      <div style={{padding:"0 12px",maxWidth:860,margin:"0 auto"}}>
        {/* Aviso */}
        <div style={{background:"#fffbeb",border:"1px solid #f59e0b",borderLeft:"4px solid #f59e0b",borderRadius:12,padding:14,display:"flex",gap:10,marginTop:-20,position:"relative",zIndex:10,marginBottom:14}}>
          <span style={{fontSize:17,flexShrink:0}}>⚠️</span>
          <div style={{fontSize:13,color:"#78350f",lineHeight:1.55}}>
            <b style={{display:"block",marginBottom:2}}>Este diagnóstico não substitui assessoria jurídica trabalhista.</b>
            É uma ferramenta de gestão administrativa preventiva. Os resultados devem ser usados como insumo para o departamento jurídico e para aprimoramento dos processos internos.
          </div>
        </div>

        {/* Dados da empresa */}
        <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",overflow:"hidden",marginBottom:12}}>
          <div style={{padding:"14px 16px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,background:"#dbeafe",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🏢</div>
            <div>
              <div style={{fontWeight:600,fontSize:15,color:"#0f2744"}}>Identificação da Empresa</div>
              <div style={{fontSize:12,color:"#64748b",marginTop:2}}>Preencha antes de iniciar</div>
            </div>
          </div>
          <div style={{padding:16,display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
            {[["razao","Razão Social","Nome da empresa"],["cnpj","CNPJ","00.000.000/0000-00"],["resp","Responsável","Nome completo"],["cargo","Cargo","Ex: Gerente de RH"]].map(([k,l,ph])=>(
              <div key={k} style={{display:"flex",flexDirection:"column",gap:4}}>
                <label style={{fontSize:11,fontWeight:600,color:"#64748b",textTransform:"uppercase",letterSpacing:.5}}>{l}</label>
                <input value={empresa[k]} onChange={e=>setEmpresa(p=>({...p,[k]:e.target.value}))} placeholder={ph}
                  style={{border:"1px solid #e2e8f0",borderRadius:8,padding:"9px 11px",fontSize:13,fontFamily:"inherit",color:"#1e293b",outline:"none",width:"100%"}}/>
              </div>
            ))}
          </div>
        </div>

        {/* Legenda */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {[{cls:"bg-green-50 border-green-200",dot:"🟢",label:"Verde",desc:"Conforme — ativo"},
            {cls:"bg-yellow-50 border-yellow-200",dot:"🟡",label:"Amarelo",desc:"Atenção — lacunas"},
            {cls:"bg-red-50 border-red-200",dot:"🔴",label:"Vermelho",desc:"Crítico — urgente"},
            {cls:"bg-slate-50 border-slate-200",dot:"⬜",label:"N/A",desc:"Não contabilizado"}].map(l=>(
            <div key={l.label} style={{borderRadius:10,padding:12,border:"1px solid"}} className={l.cls}>
              <div style={{fontSize:17,marginBottom:4}}>{l.dot}</div>
              <div style={{fontSize:12,fontWeight:600}}>{l.label}</div>
              <div style={{fontSize:11,color:"#64748b",marginTop:2}}>{l.desc}</div>
            </div>
          ))}
        </div>

        {/* Progresso */}
        <div style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",padding:16,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:13,fontWeight:600}}>Progresso do preenchimento</span>
            <span style={{fontSize:22,fontWeight:700,color:"#0f2744"}}>{pct}%</span>
          </div>
          <div style={{height:8,background:"#e2e8f0",borderRadius:20,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:20,background:"linear-gradient(90deg,#1a4a8a,#3b82f6)",width:`${pct}%`,transition:"width .3s"}}/>
          </div>
          <div style={{fontSize:12,color:"#64748b",marginTop:6,textAlign:"right"}}>{respondidos} de {totalItens} itens respondidos</div>
        </div>

        {/* Módulos */}
        {MODS.map(mod => {
          const s = calcScore(respostas, mod.id);
          const ns = s !== null ? NIVEL_STYLE[nivel(s)] : null;
          return (
            <div key={mod.id} style={{background:"#fff",borderRadius:12,border:"1px solid #e2e8f0",overflow:"hidden",marginBottom:10}}>
              {/* Header */}
              <div onClick={()=>toggleMod(mod.id)} style={{cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
                <div style={{background:"linear-gradient(90deg,#0f2744,#1a4a8a)",padding:"13px 14px",display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:34,height:34,background:"rgba(255,255,255,.15)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:17,flexShrink:0}}>{mod.id}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:14,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>Módulo {mod.id} — {mod.titulo}</div>
                    <div style={{fontSize:11,color:"rgba(255,255,255,.6)",marginTop:2}}>{mod.itens.length} itens</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:6,flexShrink:0}}>
                    <div style={{background: ns ? (nivel(s)==="v"?"rgba(34,197,94,.35)":nivel(s)==="a"?"rgba(245,158,11,.35)":"rgba(239,68,68,.35)") : "rgba(255,255,255,.15)", border:"1px solid rgba(255,255,255,.2)",borderRadius:20,padding:"3px 10px",fontSize:12,fontWeight:600,color:"#fff",minWidth:44,textAlign:"center"}}>
                      {s !== null ? `${s}%` : "—"}
                    </div>
                    <div style={{color:"rgba(255,255,255,.6)",fontSize:14,transition:"transform .25s",transform:abertos[mod.id]?"rotate(180deg)":"rotate(0deg)"}}>▾</div>
                  </div>
                </div>
              </div>

              {/* Body */}
              {abertos[mod.id] && (
                <div>
                  <div style={{padding:"12px 14px",background:"#f8fafc",borderBottom:"1px solid #e2e8f0",fontSize:13,color:"#64748b",lineHeight:1.6}}>{mod.desc}</div>

                  {/* Itens */}
                  {mod.itens.map((txt, i) => {
                    const cur = respostas[mod.id][i];
                    return (
                      <div key={i} style={{padding:"13px 14px",borderBottom:"1px solid #f1f5f9"}}>
                        <div style={{fontSize:13.5,color:"#1e293b",lineHeight:1.55,marginBottom:10}}>
                          <span style={{fontSize:11,color:"#94a3b8",marginRight:5}}>{i+1}.</span>{txt}
                        </div>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:5}}>
                          {STATUS.map(st => (
                            <button key={st.key} onClick={()=>setStatus(mod.id,i,st.key)}
                              style={{border:`1.5px solid ${cur===st.key?"currentColor":"#e2e8f0"}`,borderRadius:8,padding:"8px 3px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",lineHeight:1.3,textAlign:"center",WebkitTapHighlightColor:"transparent",transition:"all .15s"}}
                              className={cur===st.key ? st.cls : "bg-slate-50 text-slate-400 border-slate-200"}>
                              {st.emoji}<br/>{st.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Alerta */}
                  <div style={{margin:"0 14px 14px",borderRadius:8,padding:13,fontSize:13,lineHeight:1.55,borderLeft:"4px solid"}} className={`${ALERT_CLS[mod.alerta.tipo]} mt-3`}>
                    <b style={{display:"block",marginBottom:4}}>{mod.alerta.txt}</b>{mod.alerta.msg}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Botão gerar */}
        <div style={{textAlign:"center",padding:"20px 0 32px"}}>
          <button onClick={gerar} style={{background:"linear-gradient(135deg,#0f2744,#1a4a8a)",color:"#fff",border:"none",borderRadius:12,padding:"16px 0",fontSize:15,fontWeight:600,fontFamily:"inherit",cursor:"pointer",boxShadow:"0 4px 16px rgba(15,39,68,.3)",width:"100%",maxWidth:360,WebkitTapHighlightColor:"transparent"}}>
            📊 Gerar Relatório de Diagnóstico
          </button>
          <div style={{fontSize:12,color:"#64748b",marginTop:8}}>O relatório é gerado automaticamente com base nas respostas</div>
        </div>
      </div>
    </div>
  );
}
