--
-- PostgreSQL database dump
--

\restrict xd4jv5QHke9A5vr0rNEcvRFEztK5hY96yBveUu74ML6geVGY4buaU4HbhJojeJI

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: admin; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA admin;


--
-- Name: app; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA app;


--
-- Name: application_availability_enum; Type: TYPE; Schema: app; Owner: -
--

CREATE TYPE app.application_availability_enum AS ENUM (
    'part-time',
    'full-time'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admins; Type: TABLE; Schema: admin; Owner: -
--

CREATE TABLE admin.admins (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


--
-- Name: application; Type: TABLE; Schema: admin; Owner: -
--

CREATE TABLE admin.application (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    "selectedCourse" character varying NOT NULL,
    role character varying NOT NULL,
    "previousRoles" character varying NOT NULL,
    availability character varying NOT NULL,
    skills character varying NOT NULL,
    "academicCredentials" character varying NOT NULL,
    "isUnavailable" boolean DEFAULT false NOT NULL
);


--
-- Name: courses; Type: TABLE; Schema: admin; Owner: -
--

CREATE TABLE admin.courses (
    "courseCode" character varying(255) NOT NULL,
    "courseName" character varying(255) NOT NULL,
    semester character varying(10) DEFAULT 'UNSET'::character varying NOT NULL
);


--
-- Name: lecturer_course; Type: TABLE; Schema: admin; Owner: -
--

CREATE TABLE admin.lecturer_course (
    id integer NOT NULL,
    lecturer_id integer NOT NULL,
    "courseCode" character varying NOT NULL
);


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE; Schema: admin; Owner: -
--

CREATE SEQUENCE admin.lecturer_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: -
--

ALTER SEQUENCE admin.lecturer_course_id_seq OWNED BY admin.lecturer_course.id;


--
-- Name: users; Type: TABLE; Schema: admin; Owner: -
--

CREATE TABLE admin.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    "isLecturer" boolean DEFAULT false NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "selectionCount" integer DEFAULT 0 NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: admin; Owner: -
--

CREATE SEQUENCE admin.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: admin; Owner: -
--

ALTER SEQUENCE admin.users_id_seq OWNED BY admin.users.id;


--
-- Name: Users_Applications; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app."Users_Applications" (
    "userId" integer NOT NULL,
    "applicationId" uuid NOT NULL
);


--
-- Name: admins; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.admins (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


--
-- Name: admins_id_seq; Type: SEQUENCE; Schema: app; Owner: -
--

CREATE SEQUENCE app.admins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admins_id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: -
--

ALTER SEQUENCE app.admins_id_seq OWNED BY app.admins.id;


--
-- Name: application; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.application (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    role character varying NOT NULL,
    "previousRoles" character varying NOT NULL,
    availability app.application_availability_enum NOT NULL,
    skills character varying NOT NULL,
    "academicCredentials" character varying NOT NULL,
    "dateApplied" timestamp without time zone DEFAULT now() NOT NULL,
    "isSelected" boolean DEFAULT false NOT NULL,
    "isUnavailable" boolean DEFAULT false NOT NULL,
    comments text,
    rank integer,
    "selectedCourse" character varying
);


--
-- Name: course_tutor; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.course_tutor (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "courseCode" character varying NOT NULL
);


--
-- Name: course_tutor_id_seq; Type: SEQUENCE; Schema: app; Owner: -
--

CREATE SEQUENCE app.course_tutor_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: course_tutor_id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: -
--

ALTER SEQUENCE app.course_tutor_id_seq OWNED BY app.course_tutor.id;


--
-- Name: courses; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.courses (
    "courseCode" character varying NOT NULL,
    "courseName" character varying NOT NULL,
    semester character varying NOT NULL
);


--
-- Name: lecturer_course; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.lecturer_course (
    id integer NOT NULL,
    lecturer_id integer NOT NULL,
    "courseCode" character varying NOT NULL
);


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE; Schema: app; Owner: -
--

CREATE SEQUENCE app.lecturer_course_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: -
--

ALTER SEQUENCE app.lecturer_course_id_seq OWNED BY app.lecturer_course.id;


--
-- Name: users; Type: TABLE; Schema: app; Owner: -
--

CREATE TABLE app.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    "isLecturer" boolean DEFAULT false NOT NULL,
    "isBlocked" boolean DEFAULT false NOT NULL,
    "selectionCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: app; Owner: -
--

CREATE SEQUENCE app.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: app; Owner: -
--

ALTER SEQUENCE app.users_id_seq OWNED BY app.users.id;


--
-- Name: lecturer_course id; Type: DEFAULT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.lecturer_course ALTER COLUMN id SET DEFAULT nextval('admin.lecturer_course_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.users ALTER COLUMN id SET DEFAULT nextval('admin.users_id_seq'::regclass);


--
-- Name: admins id; Type: DEFAULT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.admins ALTER COLUMN id SET DEFAULT nextval('app.admins_id_seq'::regclass);


--
-- Name: course_tutor id; Type: DEFAULT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.course_tutor ALTER COLUMN id SET DEFAULT nextval('app.course_tutor_id_seq'::regclass);


--
-- Name: lecturer_course id; Type: DEFAULT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.lecturer_course ALTER COLUMN id SET DEFAULT nextval('app.lecturer_course_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.users ALTER COLUMN id SET DEFAULT nextval('app.users_id_seq'::regclass);


--
-- Data for Name: admins; Type: TABLE DATA; Schema: admin; Owner: -
--

COPY admin.admins (id, email, password) FROM stdin;
685a50ae-4f6f-4277-bf2b-8fca1b593328	admin	admin
\.


--
-- Data for Name: application; Type: TABLE DATA; Schema: admin; Owner: -
--

COPY admin.application (id, name, email, "selectedCourse", role, "previousRoles", availability, skills, "academicCredentials", "isUnavailable") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: admin; Owner: -
--

COPY admin.courses ("courseCode", "courseName", semester) FROM stdin;
\.


--
-- Data for Name: lecturer_course; Type: TABLE DATA; Schema: admin; Owner: -
--

COPY admin.lecturer_course (id, lecturer_id, "courseCode") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: admin; Owner: -
--

COPY admin.users (id, name, email, password, "isLecturer", "isBlocked", "selectionCount") FROM stdin;
\.


--
-- Data for Name: Users_Applications; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app."Users_Applications" ("userId", "applicationId") FROM stdin;
\.


--
-- Data for Name: admins; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.admins (id, email, password) FROM stdin;
1	admin	admin
\.


--
-- Data for Name: application; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.application (id, name, email, role, "previousRoles", availability, skills, "academicCredentials", "dateApplied", "isSelected", "isUnavailable", comments, rank, "selectedCourse") FROM stdin;
\.


--
-- Data for Name: course_tutor; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.course_tutor (id, "userId", "courseCode") FROM stdin;
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.courses ("courseCode", "courseName", semester) FROM stdin;
\.


--
-- Data for Name: lecturer_course; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.lecturer_course (id, lecturer_id, "courseCode") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: app; Owner: -
--

COPY app.users (id, name, email, password, "isLecturer", "isBlocked", "selectionCount", "createdAt") FROM stdin;
\.


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: -
--

SELECT pg_catalog.setval('admin.lecturer_course_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: admin; Owner: -
--

SELECT pg_catalog.setval('admin.users_id_seq', 1, false);


--
-- Name: admins_id_seq; Type: SEQUENCE SET; Schema: app; Owner: -
--

SELECT pg_catalog.setval('app.admins_id_seq', 1, true);


--
-- Name: course_tutor_id_seq; Type: SEQUENCE SET; Schema: app; Owner: -
--

SELECT pg_catalog.setval('app.course_tutor_id_seq', 1, false);


--
-- Name: lecturer_course_id_seq; Type: SEQUENCE SET; Schema: app; Owner: -
--

SELECT pg_catalog.setval('app.lecturer_course_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: app; Owner: -
--

SELECT pg_catalog.setval('app.users_id_seq', 1, false);


--
-- Name: courses PK_2a2fd7a82d6a1df5ce506dc81ff; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.courses
    ADD CONSTRAINT "PK_2a2fd7a82d6a1df5ce506dc81ff" PRIMARY KEY ("courseCode");


--
-- Name: application PK_569e0c3e863ebdf5f2408ee1670; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.application
    ADD CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: admins PK_e3b38270c97a854c48d2e80874e; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.admins
    ADD CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY (id);


--
-- Name: lecturer_course PK_f03dc5a2f43d967411a210970b0; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.lecturer_course
    ADD CONSTRAINT "PK_f03dc5a2f43d967411a210970b0" PRIMARY KEY (id);


--
-- Name: admins UQ_051db7d37d478a69a7432df1479; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.admins
    ADD CONSTRAINT "UQ_051db7d37d478a69a7432df1479" UNIQUE (email);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: courses PK_2a2fd7a82d6a1df5ce506dc81ff; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.courses
    ADD CONSTRAINT "PK_2a2fd7a82d6a1df5ce506dc81ff" PRIMARY KEY ("courseCode");


--
-- Name: application PK_569e0c3e863ebdf5f2408ee1670; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.application
    ADD CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: course_tutor PK_c2bad13091483c1db22f0c19625; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.course_tutor
    ADD CONSTRAINT "PK_c2bad13091483c1db22f0c19625" PRIMARY KEY (id);


--
-- Name: Users_Applications PK_c78dfa0ec70a07d3c334d8c0d41; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app."Users_Applications"
    ADD CONSTRAINT "PK_c78dfa0ec70a07d3c334d8c0d41" PRIMARY KEY ("userId", "applicationId");


--
-- Name: admins PK_e3b38270c97a854c48d2e80874e; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.admins
    ADD CONSTRAINT "PK_e3b38270c97a854c48d2e80874e" PRIMARY KEY (id);


--
-- Name: lecturer_course PK_f03dc5a2f43d967411a210970b0; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.lecturer_course
    ADD CONSTRAINT "PK_f03dc5a2f43d967411a210970b0" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: IDX_5e9d6006a0690a8d8dcef964b5; Type: INDEX; Schema: app; Owner: -
--

CREATE INDEX "IDX_5e9d6006a0690a8d8dcef964b5" ON app."Users_Applications" USING btree ("applicationId");


--
-- Name: IDX_dc2e0e2f9a6f5e5fc816157e8f; Type: INDEX; Schema: app; Owner: -
--

CREATE INDEX "IDX_dc2e0e2f9a6f5e5fc816157e8f" ON app."Users_Applications" USING btree ("userId");


--
-- Name: lecturer_course FK_0b4b21fbf070973f1ce658374c9; Type: FK CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.lecturer_course
    ADD CONSTRAINT "FK_0b4b21fbf070973f1ce658374c9" FOREIGN KEY (lecturer_id) REFERENCES admin.users(id) ON DELETE CASCADE;


--
-- Name: lecturer_course FK_4b6831bb5e7096fdb7cfedcda04; Type: FK CONSTRAINT; Schema: admin; Owner: -
--

ALTER TABLE ONLY admin.lecturer_course
    ADD CONSTRAINT "FK_4b6831bb5e7096fdb7cfedcda04" FOREIGN KEY ("courseCode") REFERENCES admin.courses("courseCode") ON DELETE CASCADE;


--
-- Name: lecturer_course FK_0b4b21fbf070973f1ce658374c9; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.lecturer_course
    ADD CONSTRAINT "FK_0b4b21fbf070973f1ce658374c9" FOREIGN KEY (lecturer_id) REFERENCES app.users(id);


--
-- Name: lecturer_course FK_4b6831bb5e7096fdb7cfedcda04; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.lecturer_course
    ADD CONSTRAINT "FK_4b6831bb5e7096fdb7cfedcda04" FOREIGN KEY ("courseCode") REFERENCES app.courses("courseCode");


--
-- Name: course_tutor FK_56401d0a39edadd9847ae8673dc; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.course_tutor
    ADD CONSTRAINT "FK_56401d0a39edadd9847ae8673dc" FOREIGN KEY ("userId") REFERENCES app.users(id);


--
-- Name: Users_Applications FK_5e9d6006a0690a8d8dcef964b51; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app."Users_Applications"
    ADD CONSTRAINT "FK_5e9d6006a0690a8d8dcef964b51" FOREIGN KEY ("applicationId") REFERENCES app.application(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: application FK_998df094f145a89e780696d764f; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.application
    ADD CONSTRAINT "FK_998df094f145a89e780696d764f" FOREIGN KEY ("selectedCourse") REFERENCES app.courses("courseCode");


--
-- Name: course_tutor FK_b24d1df74ae3f91cdad6886220f; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app.course_tutor
    ADD CONSTRAINT "FK_b24d1df74ae3f91cdad6886220f" FOREIGN KEY ("courseCode") REFERENCES app.courses("courseCode");


--
-- Name: Users_Applications FK_dc2e0e2f9a6f5e5fc816157e8f8; Type: FK CONSTRAINT; Schema: app; Owner: -
--

ALTER TABLE ONLY app."Users_Applications"
    ADD CONSTRAINT "FK_dc2e0e2f9a6f5e5fc816157e8f8" FOREIGN KEY ("userId") REFERENCES app.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict xd4jv5QHke9A5vr0rNEcvRFEztK5hY96yBveUu74ML6geVGY4buaU4HbhJojeJI

