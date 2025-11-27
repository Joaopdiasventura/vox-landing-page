import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

type Theme = 'light' | 'dark';

interface Card {
  title: string;
  description: string;
  icon: string;
}

interface Faq {
  question: string;
  answer: string;
}

interface DownloadLink {
  platform: 'android' | 'windows';
  label: string;
  subtitle: string;
  url: string;
  type: 'Mobile' | 'Desktop';
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  public theme = signal<Theme>('light');
  public readonly isDark = computed(() => this.theme() === 'dark');
  private prefersDark: MediaQueryList | null = null;

  public downloadLinks: DownloadLink[] = [
    {
      platform: 'android',
      label: 'Download Android',
      subtitle: 'Escaneie para instalar no Android',
      url: 'https://github.com/Joaopdiasventura/vox-files/releases/download/0.0.1/Vox.apk',
      type: 'Mobile',
    },
    {
      platform: 'windows',
      label: 'Download Windows',
      subtitle: 'Escaneie para instalar no Windows',
      url: 'https://github.com/Joaopdiasventura/vox-files/releases/download/0.0.1/Vox.Setup.0.0.1.exe',
      type: 'Desktop',
    },
  ];

  public features: Card[] = [
    {
      icon: 'file-text',
      title: 'Crie eleições',
      description:
        'Configure eleições personalizadas com múltiplas opções e parâmetros de segurança.',
    },
    {
      icon: 'clock-history',
      title: 'Gerencie sessões',
      description: 'Controle sessões de votação com abertura e fechamento programados.',
    },
    {
      icon: 'shield-check',
      title: 'Autorize e acompanhe votos',
      description: 'Autorização robusta com verificação de integridade a cada voto.',
    },
    {
      icon: 'activity',
      title: 'Resultados ao vivo',
      description: 'Acompanhamento em tempo real com WebSockets e atualização instantânea.',
    },
  ];

  public stack: Card[] = [
    { icon: 'shield-lock', title: 'JWT', description: 'Autenticação segura' },
    { icon: 'lightning-charge', title: 'Redis', description: 'Cache ultrarrápido' },
    { icon: 'database', title: 'MongoDB', description: 'Banco escalável' },
  ];

  public steps: Card[] = [
    { icon: 'file-text', title: 'Criar eleição', description: 'Defina regras e cargos' },
    { icon: 'person-plus', title: 'Cadastrar candidatos', description: 'Adicione opções de voto' },
    { icon: 'play-fill', title: 'Abrir sessão', description: 'Inicie no horário programado' },
    {
      icon: 'check-circle',
      title: 'Registrar votos',
      description: 'Eleitores votam com segurança',
    },
    {
      icon: 'bar-chart-line',
      title: 'Acompanhar em tempo real',
      description: 'Resultados instantâneos sempre disponíveis.',
    },
  ];

  public faqs: Faq[] = [
    {
      question: 'Como garantir a segurança das votações?',
      answer:
        'Usamos criptografia ponta a ponta e autenticação via tokens. Cada voto é verificado e registrado de forma íntegra.',
    },
    {
      question: 'Posso acompanhar os resultados em tempo real?',
      answer:
        'Sim. O Vox transmite resultados instantaneamente. Cada voto aparece no dashboard em tempo real.',
    },
    {
      question: 'Quantas eleições posso criar?',
      answer:
        'Sem limite. Crie várias eleições, gerencie sessões simultâneas e cadastre candidatos ilimitados.',
    },
    {
      question: 'Para quais plataformas o app está disponível?',
      answer: 'Android, Windows e versão web.',
    },
    {
      question: 'Como funciona o sistema de pagamentos?',
      answer:
        'Integração com Mercado Pago, transações criptografadas e conformidade com padrões de segurança.',
    },
  ];

  public stats = [
    { value: '100%', label: 'Seguro e confiável' },
    { value: 'Real-time', label: 'Resultados instantâneos' },
    { value: '24/7', label: 'Suporte sempre disponível' },
  ];

  public scrollTo(id: string, event?: Event): void {
    event?.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  public ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      const datasetTheme = document.documentElement.dataset['theme'] as Theme | undefined;
      const initial = datasetTheme ?? (this.prefersDark.matches ? 'dark' : 'light');
      this.applyTheme(initial);
      this.prefersDark.addEventListener('change', (e) =>
        this.applyTheme(e.matches ? 'dark' : 'light'),
      );
    } else {
      this.applyTheme('light');
    }
  }

  public toggleTheme(): void {
    this.applyTheme(this.theme() === 'light' ? 'dark' : 'light');
  }

  private applyTheme(theme: Theme): void {
    this.theme.set(theme);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset['theme'] = theme;
      document.body.dataset['theme'] = theme;
      const isDark = theme === 'dark';
      document.body.style.backgroundColor = isDark ? '#121212' : '#fbfbff';
      document.body.style.color = isDark ? '#ffffff' : '#111111';
    }
  }

  public generateQr(link: string): string {
    const base = 'https://quickchart.io/qr';
    return `${base}?text=${encodeURIComponent(link)}&size=220&margin=2`;
  }
}
