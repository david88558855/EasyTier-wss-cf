export const dashboardCss = `
        :root {
            --bg-color: #080c14;
            --card-bg: rgba(17, 24, 39, 0.7);
            --sidebar-bg: rgba(15, 23, 42, 0.95);
            --border-color: rgba(255, 255, 255, 0.08);
            --text-primary: #f3f4f6;
            --text-secondary: #9ca3af;
            --text-muted: #6b7280;
            --primary: #6366f1;
            --primary-hover: #4f46e5;
            --secondary: #8b5cf6;
            --success: #10b981;
            --danger: #ef4444;
            --warning: #f59e0b;
            --font-outfit: 'Outfit', sans-serif;
            --font-inter: 'Inter', sans-serif;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: var(--font-inter);
            background-color: var(--bg-color);
            color: var(--text-primary);
            overflow: hidden;
            height: 100vh;
            background-image: 
                radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 45%),
                radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 45%);
        }

        /* Utility classes */
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .align-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }

        /* Login Screen */
        #loginScreen {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            width: 100vw;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 100;
            background-color: var(--bg-color);
        }

        .login-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 3rem;
            width: 100%;
            max-width: 360px;
            backdrop-filter: blur(20px);
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            text-align: center;
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .login-logo {
            font-family: var(--font-outfit);
            font-size: 2rem;
            font-weight: 800;
            background: linear-gradient(135deg, #a78bfa, #6366f1);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 2rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .form-group label {
            display: block;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-secondary);
            margin-bottom: 0.5rem;
        }

        .form-control {
            width: 100%;
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 0.75rem 1rem;
            color: var(--text-primary);
            font-family: var(--font-inter);
            font-size: 0.95rem;
            outline: none;
            transition: border-color 0.3s;
        }

        .form-control:focus {
            border-color: var(--primary);
        }

        .btn-submit {
            width: 100%;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: #ffffff;
            border: none;
            border-radius: 10px;
            padding: 0.75rem;
            font-family: var(--font-outfit);
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
            transition: all 0.3s;
        }

        .btn-submit:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
        }

        .login-error {
            color: var(--danger);
            font-size: 0.85rem;
            margin-top: 1rem;
            display: none;
        }

        /* App Layout */
        #appLayout {
            display: flex;
            height: 100vh;
            max-width: 960px;
            margin: 0 auto;
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .brand {
            font-family: var(--font-outfit);
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--text-primary);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 3rem;
        }

        .menu-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            flex-grow: 1;
        }

        .menu-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
            color: var(--text-secondary);
            text-decoration: none;
            border-radius: 10px;
            font-weight: 500;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .menu-item:hover, .menu-item.active {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.05);
        }

        .menu-item.active {
            border-left: 3px solid var(--primary);
            background: rgba(99, 102, 241, 0.1);
        }

        .sidebar-footer {
            border-top: 1px solid var(--border-color);
            padding-top: 1.5rem;
            margin-top: auto;
        }

        .user-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .logout-btn {
            background: transparent;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            transition: color 0.2s;
        }

        .logout-btn:hover {
            color: var(--danger);
        }

        /* Main Content Container */
        main {
            flex-grow: 1;
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            height: 100vh;
        }

        /* Top Header */
        .top-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .page-title {
            font-family: var(--font-outfit);
            font-size: 1.75rem;
            font-weight: 700;
        }

        .refresh-indicator {
            font-size: 0.8rem;
            color: var(--text-muted);
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.03);
            padding: 0.4rem 0.8rem;
            border-radius: 9999px;
            border: 1px solid var(--border-color);
        }

        .refresh-spinner {
            width: 12px;
            height: 12px;
            border: 2px solid var(--text-muted);
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            display: none;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Dashboard Overview Content */
        .tab-content {
            display: none;
            flex-direction: column;
            gap: 2rem;
            animation: fadeIn 0.4s ease;
        }

        .tab-content.active {
            display: flex;
        }

        /* Cards Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
        }

        .stat-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            backdrop-filter: blur(15px);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 1.25rem;
        }

        .stat-icon {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .stat-data {
            display: flex;
            flex-direction: column;
        }

        .stat-label {
            font-size: 0.8rem;
            color: var(--text-secondary);
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .stat-val {
            font-family: var(--font-outfit);
            font-size: 1.6rem;
            font-weight: 700;
            margin-top: 0.25rem;
        }

        /* Topology Card */
        .topo-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 1.5rem;
            min-height: 400px;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(15px);
        }

        .topo-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .topo-title {
            font-family: var(--font-outfit);
            font-size: 1.15rem;
            font-weight: 600;
        }

        .topo-body {
            flex-grow: 1;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.03);
            border-radius: 12px;
            position: relative;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 350px;
        }

        .topo-svg {
            width: 100%;
            height: 100%;
            min-height: 350px;
            position: absolute;
            top: 0;
            left: 0;
        }

        /* Tables & Lists */
        .table-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 1.5rem;
            backdrop-filter: blur(15px);
        }

        .table-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .table-title {
            font-family: var(--font-outfit);
            font-size: 1.2rem;
            font-weight: 700;
        }

        .table-container {
            width: 100%;
            overflow-x: auto;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        th {
            padding: 1rem;
            color: var(--text-secondary);
            font-weight: 600;
            font-size: 0.85rem;
            border-bottom: 1px solid var(--border-color);
            text-transform: uppercase;
        }

        td {
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.03);
            font-size: 0.9rem;
            vertical-align: middle;
        }

        tr:hover td {
            background: rgba(255, 255, 255, 0.01);
        }

        .badge-status {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.25rem 0.6rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-success { background: rgba(16, 185, 129, 0.15); color: var(--success); }
        .badge-danger { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
        .badge-warning { background: rgba(245, 158, 11, 0.15); color: var(--warning); }

        .btn-action {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 0.4rem 0.8rem;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.8rem;
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            transition: all 0.2s;
        }

        .btn-action:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--primary);
        }

        .btn-danger-action {
            background: rgba(239, 68, 68, 0.05);
            border-color: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
        }

        .btn-danger-action:hover {
            background: rgba(239, 68, 68, 0.15);
            border-color: var(--danger);
            color: #ffffff;
        }

        .btn-create {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            border: none;
            color: #ffffff;
            padding: 0.6rem 1.25rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 15px rgba(99, 102, 241, 0.25);
            transition: all 0.2s;
        }

        .btn-create:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
        }

        /* Language switcher */
        .header-controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .top-lang-wrapper {
            position: relative;
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--border-color);
            padding: 0.4rem 1.5rem 0.4rem 0.8rem;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 0.35rem;
            cursor: pointer;
        }

        .top-lang-select {
            background: transparent;
            color: var(--text-primary);
            border: none;
            outline: none;
            font-size: 0.8rem;
            font-weight: 500;
            appearance: none;
            cursor: pointer;
        }

        .top-lang-arrow {
            position: absolute;
            right: 0.6rem;
            color: var(--text-muted);
            pointer-events: none;
            width: 12px;
            height: 12px;
        }

        /* Settings CSS */
        .settings-card {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            backdrop-filter: blur(15px);
            max-width: 700px;
        }

        .settings-title {
            font-family: var(--font-outfit);
            font-size: 1.35rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 0.75rem;
        }

        .settings-group {
            margin-bottom: 2rem;
        }

        .switch-control {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .switch-label h4 {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .switch-label p {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        /* Toggle switch */
        .switch {
            position: relative;
            display: inline-block;
            width: 52px;
            height: 28px;
        }

        .switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }

        .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.1);
            transition: .4s;
            border-radius: 34px;
            border: 1px solid var(--border-color);
        }

        .slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }

        input:checked + .slider {
            background-color: var(--primary);
        }

        input:checked + .slider:before {
            transform: translateX(24px);
        }

        /* Modal styling */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 200;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(5px);
        }

        .modal-card {
            background: var(--sidebar-bg);
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2.5rem;
            width: 100%;
            max-width: 500px;
            animation: slideUp 0.3s ease;
            max-height: 85vh;
            overflow-y: auto;
        }

        .modal-title {
            font-family: var(--font-outfit);
            font-size: 1.25rem;
            font-weight: 700;
            margin-bottom: 1.5rem;
        }

        .modal-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 2rem;
        }

        .btn-cancel {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 0.6rem 1.25rem;
            border-radius: 10px;
            cursor: pointer;
            font-weight: 600;
        }

        .btn-cancel:hover {
            background: rgba(255, 255, 255, 0.03);
            color: #ffffff;
        }


        /* Custom Alert Banner */
        .alert-banner {
            background: rgba(245, 158, 11, 0.1);
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: #fcd34d;
            padding: 1rem;
            border-radius: 12px;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 2rem;
        }

        /* RESPONSIVE MEDIA QUERIES */
        @media (max-width: 768px) {
            main {
                padding: 1.5rem;
            }
            .stats-grid {
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            .stat-card {
                padding: 1rem;
                gap: 0.75rem;
            }
            .stat-icon {
                width: 40px;
                height: 40px;
            }
            .stat-val {
                font-size: 1.3rem;
            }
            .page-title {
                font-size: 1.5rem;
            }
            .refresh-indicator {
                font-size: 0.75rem;
                padding: 0.3rem 0.6rem;
            }
            .top-nav {
                flex-direction: column;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            .header-controls {
                width: 100%;
                justify-content: space-between;
            }
            .table-title {
                font-size: 1rem;
            }
            th {
                padding: 0.75rem;
                font-size: 0.75rem;
            }
            td {
                padding: 0.75rem;
                font-size: 0.85rem;
            }
            .btn-action {
                padding: 0.35rem 0.7rem;
                font-size: 0.75rem;
            }
            .btn-create {
                padding: 0.5rem 1rem;
                font-size: 0.85rem;
            }
        }

        @media (max-width: 480px) {
            body {
                overflow-y: auto;
            }
            #appLayout {
                flex-direction: column;
            }
                left: -280px;
                top: 0;
                height: 100vh;
                z-index: 18;
                transition: left 0.3s ease;
                overflow-y: auto;
                padding: 1rem;
                border-right: 1px solid var(--border-color);
            }
        }
            .brand {
                font-size: 1.2rem;
                margin-bottom: 2rem;
            }
            main {
                flex-grow: 1;
                width: 100%;
                padding: 0;
                height: auto;
                overflow-y: auto;
            }
            .top-nav {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
                padding: 1rem;
                border-bottom: 1px solid var(--border-color);
            }
            .page-title {
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            .header-controls {
                flex-direction: row;
                gap: 0.5rem;
                width: 100%;
            }
            .refresh-indicator {
                flex-grow: 1;
                font-size: 0.7rem;
                padding: 0.3rem 0.5rem;
            }
            .top-lang-wrapper {
                padding: 0.3rem 0.6rem 0.3rem 0.5rem;
                font-size: 0.7rem;
            }
            .top-lang-select {
                font-size: 0.7rem;
            }
            .tab-content {
                padding: 0;
                gap: 1.5rem;
            }
            #tabOverview {
                padding: 1rem;
            }
            .stats-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
            .stat-card {
                padding: 1rem;
                gap: 0.75rem;
                min-height: auto;
            }
            .stat-icon {
                width: 40px;
                height: 40px;
                flex-shrink: 0;
            }
            .stat-label {
                font-size: 0.75rem;
            }
            .stat-val {
                font-size: 1.2rem;
            }
            .topo-card {
                min-height: 300px;
                padding: 1rem;
            }
            .topo-body {
                min-height: 250px;
            }
            .topo-svg {
                min-height: 250px;
            }
            .table-card {
                padding: 1rem;
                border-radius: 12px;
            }
            .table-header-row {
                margin-bottom: 1rem;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
            .table-title {
                font-size: 1rem;
                flex-basis: 100%;
            }
            .table-container {
                overflow-x: auto;
            }
            table {
                width: 100%;
            }
            table thead {
                display: none;
            }
            table tr {
                display: block;
                background: rgba(255, 255, 255, 0.02);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                margin-bottom: 1rem;
                overflow: hidden;
            }
            table td {
                display: block;
                padding: 0.75rem;
                text-align: left;
                border: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.03);
                position: relative;
                padding-left: 50%;
            }
            table td:last-child {
                border-bottom: none;
            }
            table td:before {
                content: attr(data-label);
                position: absolute;
                left: 0.75rem;
                top: 0.75rem;
                color: var(--text-secondary);
                font-weight: 600;
                font-size: 0.75rem;
                text-transform: uppercase;
            }
            tr:hover td {
                background: transparent;
            }
            .btn-action {
                padding: 0.5rem 0.75rem;
                font-size: 0.75rem;
                min-height: 36px;
                min-width: 44px;
                display: inline-flex;
            }
            .btn-create {
                padding: 0.6rem 1rem;
                font-size: 0.85rem;
                min-height: 44px;
                width: 100%;
            }
            .btn-submit {
                padding: 0.75rem;
                font-size: 0.95rem;
                min-height: 44px;
            }
            .btn-cancel {
                padding: 0.6rem 1rem;
                min-height: 44px;
            }
            .modal-card {
                max-width: calc(100% - 2rem);
                padding: 1.5rem 1rem;
                border-radius: 16px;
                max-height: 90vh;
                overflow-y: auto;
            }
            .modal-title {
                font-size: 1.1rem;
                margin-bottom: 1rem;
            }
            .modal-actions {
                gap: 0.75rem;
                margin-top: 1.5rem;
                flex-wrap: wrap;
            }
            .btn-cancel, .btn-submit {
                flex: 1;
                min-width: 100px;
            }
            .form-group {
                margin-bottom: 1rem;
            }
            .form-control {
                padding: 0.75rem 1rem;
                font-size: 1rem;
                min-height: 44px;
            }
            textarea.form-control {
                min-height: 100px;
                resize: vertical;
            }
            .form-control:focus {
                border-color: var(--primary);
                background: rgba(0, 0, 0, 0.5);
            }
            .settings-card {
                max-width: 100%;
                padding: 1rem;
            }
            .settings-title {
                font-size: 1rem;
                margin-bottom: 1rem;
            }
            .switch-control {
                margin-bottom: 1rem;
            }
            .switch-label h4 {
                font-size: 0.95rem;
            }
            .switch-label p {
                font-size: 0.8rem;
                line-height: 1.4;
            }
            .login-card {
                padding: 2rem 1.5rem;
                max-width: calc(100% - 1rem);
                margin: 1rem auto;
            }
            .login-logo {
                font-size: 1.5rem;
                margin-bottom: 1rem;
            }
            .login-copy h1 {
                font-size: 1rem;
            }
            .login-copy p {
                font-size: 0.85rem;
                line-height: 1.4;
            }
            #easyTierConfigModal [style*="grid-template-columns: 1fr 1fr"] {
                grid-template-columns: 1fr !important;
            }
        }
    `;
